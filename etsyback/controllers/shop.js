import { findEntity } from "../models";

export async function getShop(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'user id is missing' });
  }

  const findUser = await findEntity('user', ['*'], ['id', id]);
  //Check if this user exists
  if (findUser.length === 0) {
    console.error("User does not exists!");
    return res.status(400).json({ message: "User does not exists" });
  }

  const response = await findEntity('shop', ['*'], ['userId', id]);
  return res.status(200).json(response);
}
