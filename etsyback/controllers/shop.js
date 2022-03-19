import { findEntity, createEntity } from "../models";
import formidable from 'formidable';
import path from "path";
import fs from "fs";

export async function createShop(req, res) {
  //Check incoming validation  
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  let avatarUrl = null;

  form.parse(req, async (err, fields, files) => {
    if(err) {
      console.log(err);
      return res.status(400).json({message: "Unable to parse Input"});
    }
    if(files.avatarUrl) {
      const tempFilePath = files.avatarUrl.filepath;
      const fileName = "image-" + Date.now() + path.extname(files.avatarUrl.originalFilename);
      const uploadedFolder = './public/shop/';

      if (!fs.existsSync(uploadedFolder)){
        fs.mkdirSync(uploadedFolder, { recursive: true });  
      }

      fs.readFile(tempFilePath, function(err, data) {
        fs.writeFile(uploadedFolder + fileName, data, function(err) {
            fs.unlink(tempFilePath, function(err) {
                if (err) {
                    console.error(err);
                    } else {
                    console.log("Image uploaded successfully");
                }
            });
        });
      });
      const [first, ...rest] = (uploadedFolder + fileName).split('/');
      avatarUrl = rest.join('/');
    }
    const {userId, name, description, address1, address2, city, state, country, zipcode } = fields;
    const user = await findEntity('user', ['*'], ['id', parseInt(userId)]);
    //Check if this user id exists
    if(user.length === 0) {
      return res.status(400).json({message: "User doesn't exists"});
    }

    const shop = await findEntity('shop', ['*'], ['name', name]);
    if (shop.length >= 1) {
      return res.status(400).json({ message: "Shop name is taken"});
    }

    const address = {
      address1,
      address2,
      city,
      state,
      country,
      zipcode
    }
    const createdAddress = await createEntity('address', address);
    const shopInput = {
      name,
      description,
      avatarUrl,
      userId,
      addressId: createdAddress[0]
    }
    const createdShop = await createEntity('shop', shopInput);
    const shopinfo = await findEntity('shop', ['*'], ['id', parseInt(createdShop[0])])

    const response = {
      user: user[0],
      shop: shopinfo[0],
      inventory: [],
    }
    return res.status(200).json(response);
  });
}

export async function getShop(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'user id is missing' });
  }

  const user = await findEntity('user', ['*'], ['id', id]);
  //Check if this user exists
  if (user.length === 0) {
    console.error("User does not exists!");
    return res.status(400).json({ message: "User does not exists" });
  }

  const shop = await findEntity('shop', ['*'], ['userId', id]);
  let inventory = [];
  if(shop.length > 0 ) {
    inventory = await findEntity('inventory', ['*'], ['shopId', shop[0].id]);
  }

  const response = {
    user: user[0],
    shop: shop[0],
    inventory,
  }
  return res.status(200).json(response);
}

export async function isShopNameAvailable(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'shop name is missing' });
  }

  const findShop = await findEntity('shop', ['*'], ['name', name]);

  if (findShop.length >= 1) {
    return res.status(200).json({ message: false});
  }

  return res.status(200).json({ message: true });

}

export async function getShopCategories(req, res) {
  const { shopId } = req.params

  if (!shopId) {
    return res.status(400).json({ message: 'shop id is missing' });
  }

  const shop = await findEntity('shop', ['*'], ['id', shopId]);
  if(shop.length === 0 ) {
    console.error("Shop does not exists!");
    return res.status(400).json({ message: "Shop does not exists" });
  }

  const defaultCategories = ['Art', 'Clothing', 'Jewellery', 'Entertainment', 'Home Decor'];
  const customCategories = await findEntity('category', ['*'], ['shopId', shopId]);

  const response = {
    default: defaultCategories,
    custom: customCategories
  }
  return res.status(200).json(response);

}

export async function createShopProduct(req, res) {
  // Check incoming validation  
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  let pictureUrl = null;

  form.parse(req, async (err, fields, files) => {
    if(err) {
      console.log(err);
      return res.status(400).json({message: "Unable to parse Input"});
    }
    if(files.pictureUrl) {
      const tempFilePath = files.pictureUrl.filepath;
      const fileName = "image-" + Date.now() + path.extname(files.pictureUrl.originalFilename);
      const uploadedFolder = './public/products/';

      if (!fs.existsSync(uploadedFolder)){
        fs.mkdirSync(uploadedFolder, { recursive: true });  
      }

      fs.readFile(tempFilePath, function(err, data) {
        fs.writeFile(uploadedFolder + fileName, data, function(err) {
            fs.unlink(tempFilePath, function(err) {
              if (err) {
                console.error(err);
              } 
            });
        });
      });
      const [first, ...rest] = (uploadedFolder + fileName).split('/');
      pictureUrl = rest.join('/');
    }
    const {shopId, name, description, isCustom, category, price, quantity } = fields;

    const findShop = await findEntity('shop', ['*'], ['id', parseInt(shopId)]);
    if(findShop.length === 0) {
      return res.status(400).json({message: "Shop doesn't exists"});
    }

    const user = await findEntity('user', ['*'], ['id', parseInt(findShop[0].userId)]);

    const productInput = {
      name,
      description,
      pictureUrl,
      price,
      quantity,
      shopId,
    }

    if(isCustom) {
      const createdCategory = await createEntity('category', {name: category, shopId});
      productInput.categoryId = createdCategory[0];
    } 

    productInput.category = category;
    const createdProduct = await createEntity('inventory', productInput);
    const inventory = await findEntity('inventory', ['*'], ['id', parseInt(createdProduct[0])])

    const response = {
      user: user[0],
      shop: findShop[0],
      inventory,
    }
    return res.status(200).json(response);
  });
}
