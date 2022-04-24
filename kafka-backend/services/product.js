import {
  findEntity, findOneEntity, createEntity, deleteOneEntity,
} from '../models';
import Inventory from '../models/inventory';
import OrderDetails from '../models/orderDetails';
import { decodeToken } from '../helpers/auth';
import UserFavorites from '../models/userFavorites';

export const getProducts = async (input, callback) => {
  const products = await findEntity(Inventory);
  let total = 0;
  await Promise.all(
    products.map(async (product) => {
      const temp = await findEntity(OrderDetails, { inventoryId: product._id }, 'orderQuantity');
      total = temp.length;
      product.totalSales = total;
    }),
  );

  const response = {
    message: products,
    status: 200,
  };

  callback(null, response);
};

export const getUserFavorites = async (token, callback) => {
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const findFavorites = await findEntity(UserFavorites, { userId });
  const data = [];
  await Promise.all(
    findFavorites.map(async (product) => {
      const temp = await findOneEntity(Inventory, { _id: product.inventoryId });
      if (temp) {
        data.push(temp);
      }
    }),
  );

  const response = {
    message: data,
    status: 200,
  };

  callback(null, response);
};

export const searchProductsByName = async (input, callback) => {
  const searchParam = input.name;
  let products = [];
  if (searchParam) {
    products = await findEntity(Inventory, { name: new RegExp(searchParam, 'i') });
  } else {
    products = await findEntity(Inventory, {});
  }

  const response = {
    message: products,
    status: 200,
  };

  callback(null, response);
};

export const favoriteProduct = async (inputPayload, callback) => {
  const { token, input } = inputPayload;
  const { inventoryId } = input;
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const userFavorites = new UserFavorites({
    inventoryId,
    userId,
  });
  await createEntity(userFavorites);
  const findFavorites = await findEntity(UserFavorites, { userId });
  const response = {
    message: findFavorites,
    status: 200,
  };

  callback(null, response);
};

export const deleteFavoriteProduct = async (inputPayload, callback) => {
  const { token, input } = inputPayload;
  const payload = await decodeToken(token);
  const { inventoryId } = input;
  const userId = payload.data.id;

  await deleteOneEntity(UserFavorites, { userId, inventoryId });
  const findFavorites = await findEntity(UserFavorites, { userId });

  const response = {
    message: findFavorites,
    status: 200,
  };

  callback(null, response);
};
