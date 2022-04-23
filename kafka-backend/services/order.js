import {
  findEntity, findOneEntity,
} from '../models';
import User from '../models/users';
import OrderDetails from '../models/orderDetails';
import { decodeToken } from '../helpers/auth';
import Order from '../models/order';

export const getOrders = async (token, callback) => {
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const findUser = await findOneEntity(User, { _id: userId });
  // Check if this user  exists
  if (!findUser) {
    console.error('User does not exists!');
    return res.status(400).json({ message: 'User does not exists' });
  }
  const data = [];
  const orders = await findEntity(Order, { userId });

  await Promise.all(
    orders.map(async (order) => {
      const item = {};
      item.order = order;
      const orderDetails = await findEntity(OrderDetails, { orderId: order.orderId });
      item.orderDetails = orderDetails;
      data.push(item);
    }),
  );

  const response = {
    message: data,
    status: 200,
  }

  callback(null, response);
};