import {
  createEntity, findEntity, findOneEntity, deleteOneEntity,
} from '../models';
import { decodeToken } from '../helpers/auth';
import UserFavorites from '../models/userFavorites';
import Inventory from '../models/inventory';
import OrderDetails from '../models/orderDetails';

export async function getProducts(req, res) {
  const products = await findEntity(Inventory);
  let total = 0;
  await Promise.all(
    products.map(async (product) => {
      const temp = await findEntity(OrderDetails, { inventoryId: product._id }, 'orderQuantity');
      total = temp.length;
      product.totalSales = total;
    }),
  );

  return res.status(200).json(products);
}

export async function favoriteProduct(req, res) {
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const inventoryId = req.body.inventoryId;
  const userFavorites = new UserFavorites({
    inventoryId,
    userId,
  });
  await createEntity(userFavorites);
  const findFavorites = await findEntity(UserFavorites, { userId });

  return res.status(200).json(findFavorites);
}

export async function deleteFavoriteProduct(req, res) {
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const inventoryId = req.body.inventoryId;
  await deleteOneEntity(UserFavorites, { userId, inventoryId });
  const findFavorites = await findEntity(UserFavorites, { userId });
  return res.status(200).json(findFavorites);
}

export async function getUserFavorites(req, res) {
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const findFavorites = await findEntity(UserFavorites, { userId });
  const response = [];
  await Promise.all(
    findFavorites.map(async (product) => {
      const temp = await findOneEntity(Inventory, { _id: product.inventoryId });
      if (temp) {
        response.push(temp);
      }
    }),
  );

  return res.status(200).json(response);
}

export async function searchProductsByName(req, res) {
  let products = [];
  if (req.params.name) {
    products = await findEntity(Inventory, { name: new RegExp(req.params.name, 'i') });
  } else {
    products = await findEntity(Inventory, {});
  }
  return res.status(200).json(products);
}
