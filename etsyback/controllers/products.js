import {
  createEntity, findEntity, deleteOneEntity,
} from '../models';
import { decodeToken } from '../helpers/auth';
import UserFavorites from '../models/userFavorites';

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
