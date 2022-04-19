import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import {
  findEntity, findOneEntity,
  createEntity, updateOneEntity,
} from '../models';
import { decodeToken } from '../helpers/auth';
import Shop from '../models/shop';
import User from '../models/users';
import Inventory from '../models/inventory';
import Category from '../models/category';
import OrderDetails from '../models/orderDetails';

export async function createShop(req, res) {
  // Check incoming validation
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  let avatarUrl = null;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: 'Unable to parse Input' });
    }
    if (files.avatarUrl) {
      const tempFilePath = files.avatarUrl.filepath;
      const fileName = `image-${Date.now()}${path.extname(files.avatarUrl.originalFilename)}`;
      const uploadedFolder = './public/shop/';

      if (!fs.existsSync(uploadedFolder)) {
        fs.mkdirSync(uploadedFolder, { recursive: true });
      }

      fs.readFile(tempFilePath, (err, data) => {
        fs.writeFile(uploadedFolder + fileName, data, () => {
          fs.unlink(tempFilePath, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('Image uploaded successfully');
            }
          });
        });
      });
      const [first, ...rest] = (uploadedFolder + fileName).split('/');
      avatarUrl = rest.join('/');
    }
    const {
      name, description, address,
    } = fields;
    const user = await findOneEntity(User, { _id: userId });
    // Check if this user id exists
    if (!user) {
      return res.status(400).json({ message: "User doesn't exists" });
    }

    const shop = await findOneEntity(Shop, { name });
    if (shop) {
      return res.status(400).json({ message: 'Shop name is taken' });
    }

    const shopInput = new Shop({
      name,
      description,
      avatarUrl,
      userId,
      address,
    });
    const createdShop = await createEntity(shopInput);

    const response = {
      user,
      shop: createdShop,
      inventory: [],
    };
    return res.status(200).json(response);
  });
}

export async function getShop(req, res) {
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const id = payload.data.id;

  if (!id) {
    return res.status(400).json({ message: 'user id is missing' });
  }

  const user = await findOneEntity(User, { _id: id });
  // Check if this user exists
  if (!user) {
    console.error('User does not exists!');
    return res.status(400).json({ message: 'User does not exists' });
  }

  const shop = await findOneEntity(Shop, { userId: id });
  let inventory = [];
  if (shop) {
    inventory = await findEntity(Inventory, { shopId: shop._id });
  }

  const response = {
    user,
    shop,
    inventory,
  };

  let total = 0;
  await Promise.all(
    inventory.map(async (item) => {
      const temp = await findEntity(OrderDetails, { inventoryId: item._id }, ['orderQuantity']);
      total += temp.length;
    }),
  );
  response.totalSales = total;

  return res.status(200).json(response);
}

export async function isShopNameAvailable(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'shop name is missing' });
  }

  const findShop = await findOneEntity(Shop, { name });

  if (findShop) {
    return res.status(200).json({ message: false });
  }

  return res.status(200).json({ message: true });
}

export async function getShopCategories(req, res) {
  const { shopId } = req.params;

  if (!shopId) {
    return res.status(400).json({ message: 'shop id is missing' });
  }

  const shop = await findOneEntity(Shop, { _id: shopId });
  if (!shop) {
    console.error('Shop does not exists!');
    return res.status(400).json({ message: 'Shop does not exists' });
  }

  const defaultCategories = ['Art', 'Clothing', 'Jewellery', 'Entertainment', 'Home Decor'];
  const customCategories = await findEntity(Category, { shopId });
  const response = {
    default: defaultCategories,
    custom: customCategories,
  };
  return res.status(200).json(response);
}

export async function createShopProduct(req, res) {
  // Check incoming validation
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  let pictureUrl = null;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: 'Unable to parse Input' });
    }
    if (files.pictureUrl) {
      const tempFilePath = files.pictureUrl.filepath;
      const fileName = `image-${Date.now()}${path.extname(files.pictureUrl.originalFilename)}`;
      const uploadedFolder = './public/products/';

      if (!fs.existsSync(uploadedFolder)) {
        fs.mkdirSync(uploadedFolder, { recursive: true });
      }

      fs.readFile(tempFilePath, (err, data) => {
        fs.writeFile(uploadedFolder + fileName, data, (err) => {
          fs.unlink(tempFilePath, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });
      });
      const [first, ...rest] = (uploadedFolder + fileName).split('/');
      pictureUrl = rest.join('/');
    }
    const {
      shopId, name, description, isCustom, category, price, quantity,
    } = fields;

    const shop = await findOneEntity(Shop, { _id: shopId });
    if (!shop) {
      return res.status(400).json({ message: "Shop doesn't exists" });
    }

    const user = await findOneEntity(User, { _id: shop.userId });

    let inventoryInput;
    if (isCustom) {
      const newCategory = new Category({
        name: category,
        shopId,
      });

      const createdCategory = await createEntity(newCategory);
      const categoryId = createdCategory._id;
      inventoryInput = new Inventory({
        name,
        description,
        pictureUrl,
        price,
        quantity,
        shopId,
        categoryId,
        category,
      });
    } else {
      inventoryInput = new Inventory({
        name,
        description,
        pictureUrl,
        price,
        quantity,
        shopId,
        category,
      });
    }

    const inventory = await createEntity(inventoryInput);

    const response = {
      user,
      shop,
      inventory,
    };
    return res.status(200).json(response);
  });
}

export async function updateShopProduct(req, res) {
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  const pictureUrl = null;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: 'Unable to parse Input' });
    }
    const {
      productId, name, description, isCustom, category, price, quantity,
    } = fields;
    let { pictureUrl } = fields;

    if (files.pictureUrl) {
      const tempFilePath = files.pictureUrl.filepath;
      const fileName = `image-${Date.now()}${path.extname(files.pictureUrl.originalFilename)}`;
      const uploadedFolder = './public/products/';

      if (!fs.existsSync(uploadedFolder)) {
        fs.mkdirSync(uploadedFolder, { recursive: true });
      }

      fs.readFile(tempFilePath, (err, data) => {
        fs.writeFile(uploadedFolder + fileName, data, (err) => {
          fs.unlink(tempFilePath, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });
      });
      const [first, ...rest] = (uploadedFolder + fileName).split('/');
      pictureUrl = rest.join('/');
    }

    const findProduct = await findOneEntity(Inventory, { _id: productId });
    if (!findProduct) {
      return res.status(400).json({ message: "Product doesn't exists" });
    }

    const shop = await findOneEntity(Shop, { _id: findProduct.shopId });
    const user = await findOneEntity(User, { _id: shop.userId });

    const productInput = {
      name,
      description,
      pictureUrl,
      price,
      quantity,
      shopId: shop._id,
    };

    if (isCustom) {
      const newCategory = new Category({
        name: category,
        productId,
      });

      const createdCategory = await createEntity(newCategory);
      productInput.categoryId = createdCategory._id;
      productInput.category = null;
    } else {
      productInput.category = category;
    }

    await updateOneEntity(Inventory, { _id: productId }, productInput);
    const inventory = await findEntity(Inventory, { shopId: findProduct.shopId });

    const response = {
      user,
      shop,
      inventory,
    };

    return res.status(200).json(response);
  });
}
