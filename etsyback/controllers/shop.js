import { findEntity, createEntity } from "../models";
import formidable from 'formidable';
import path from "path";
import fs from "fs";

export async function createShop(req, res) {
  //Check incoming validation

  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  // console.log(form);
  const { openedFiles } = await form.parse(req);
  console.log(openedFiles);
  if(openedFiles.length > 0) {
    const tempFilePath = openedFiles[0].filepath;
    const fileName = "image-" + Date.now() + path.extname(openedFiles[0].originalFilename);
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
  }

  const user = await findEntity('user', ['*'], ['id', input.id]);
  
  //Check if this user id exists
  if(user.length === 0) {
    return res.status(400).json({message: "User doesn't exists"});
  }

  const shop = await findEntity('shop', ['*'], ['name', input.name]);
  if (shop.length >= 1) {
    return res.status(400).json({ message: "Shop name is taken"});
  }

  const address = await createEntity('address', input.address);
  const shopInput = {
    ...input,
    addressId: address[0].id
  }
  const createdShop = await createEntity('shop', shopInput);

  const response = {
    user: user[0],
    // shop: createdShop[0],
    inventory: [],
  }
  return res.status(200).json('response');

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

export async function createShopProduct(req, res) {
  const input = req.body;


  if(!input.shopId) {
    return res.status(400).json({message: "Cannot add a product without a shop"});
  }


  const findShop = await findEntity('shop', ['*'], ['id', input.shopId]);

  if(findShop.length === 0) {
    return res.status(400).json({message: "Shop doesnt exists"});
  }

  const productData = {
    ...input,
  };

  const product = await createEntity('inventory', productData);
  const createdProduct = await findEntity('inventory', ['*'], ['id', product[0]]);
  const response = {
    ...createdProduct[0]
  };


  return res.status(200).json(response);
}
