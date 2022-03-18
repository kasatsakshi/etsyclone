import { findEntity } from "../models";

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
