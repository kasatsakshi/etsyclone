import path from 'path';
import fs from 'fs';
import {
  findEntity, findOneEntity, createEntity, updateOneEntity,
} from '../models';
import { decodeToken } from '../helpers/auth';
import Shop from '../models/shop';
import User from '../models/users';
import Inventory from '../models/inventory';
import OrderDetails from '../models/orderDetails';
import Category from '../models/category';

export const getShop = async (token, callback) => {
  const payload = await decodeToken(token);
  const id = payload.data.id;

  if (!id) {
    console.error('User id is missing');
    const response = {
      message: 'User does not exists!',
      status: 400,
    };
    callback(null, response);
  }

  const user = await findOneEntity(User, { _id: id });
  // Check if this user exists
  if (!user) {
    console.error('User does not exists!');
    const response = {
      message: 'User does not exists!',
      status: 400,
    };
    callback(null, response);
  }

  const shop = await findOneEntity(Shop, { userId: id });
  let inventory = [];
  if (shop) {
    inventory = await findEntity(Inventory, { shopId: shop._id });
  }

  const data = {
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
  data.totalSales = total;

  const response = {
    message: data,
    status: 200,
  };

  callback(null, response);
};

export const getShopCategories = async (input, callback) => {
  const { shopId } = input;

  if (!shopId) {
    const response = {
      message: 'Shop id is missing',
      status: 400,
    };
    callback(null, response);
  }

  const shop = await findOneEntity(Shop, { _id: shopId });
  if (!shop) {
    console.error('Shop does not exists!');
    const response = {
      message: 'Shop does not exists',
      status: 400,
    };
    callback(null, response);
  }

  const defaultCategories = ['Art', 'Clothing', 'Jewellery', 'Entertainment', 'Home Decor'];
  const customCategories = await findEntity(Category, { shopId });
  const data = {
    default: defaultCategories,
    custom: customCategories,
  };

  const response = {
    message: data,
    status: 200,
  };

  callback(null, response);
};

export const isShopNameAvailable = async (input, callback) => {
  const { name } = input;

  if (!name) {
    const response = {
      message: 'Shop name is missing',
      status: 400,
    };
    callback(null, response);
  }

  const findShop = await findOneEntity(Shop, { name });

  let data;
  if (findShop) {
    data = { message: false };
  } else {
    data = { message: true };
  }

  const response = {
    message: data,
    status: 200,
  };

  callback(null, response);
};

export const createShop = async (requestPayload, callback) => {
  // Check incoming validation
  const { input, token } = requestPayload;
  const { files, fields } = input;

  const payload = await decodeToken(token);
  const userId = payload.data.id;
  let avatarUrl = null;

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
    const response = {
      message: 'User does not exists',
      status: 400,
    };
    callback(null, response);
  }

  const shop = await findOneEntity(Shop, { name });
  if (shop) {
    const response = {
      message: 'Shop name is taken',
      status: 400,
    };
    callback(null, response);
  }

  const shopInput = new Shop({
    name,
    description,
    avatarUrl,
    userId,
    address,
  });
  const createdShop = await createEntity(shopInput);

  const data = {
    user,
    shop: createdShop,
    inventory: [],
  };

  const response = {
    message: data,
    status: 200,
  };

  callback(null, response);
};

export const createShopProduct = async (requestPayload, callback) => {
  // Check incoming validation
  const { input, token } = requestPayload;
  const { files, fields } = input;

  const payload = await decodeToken(token);
  const userId = payload.data.id;
  let pictureUrl = null;

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
    const response = {
      message: 'Shop does not exists',
      status: 400,
    };
    callback(null, response);
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

  const data = {
    user,
    shop,
    inventory,
  };

  const response = {
    message: data,
    status: 200,
  };

  callback(null, response);
};

export const updateShopProduct = async (requestPayload, callback) => {
  const { input } = requestPayload;
  const { files, fields } = input;

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
    const response = {
      message: 'Product does not exists',
      status: 400,
    };
    callback(null, response);
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

  const data = {
    user,
    shop,
    inventory,
  };

  const response = {
    message: data,
    status: 200,
  };

  callback(null, response);
};
