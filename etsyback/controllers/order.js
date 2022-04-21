import cuid from 'cuid';
import {
  findEntity, findOneEntity, createEntity, updateEntity,
} from '../models';
import { decodeToken } from '../helpers/auth';
import User from '../models/users';
import Order from '../models/order';
import OrderDetails from '../models/orderDetails';

export async function createOrder(req, res) {
  const input = req.body;

  const findUser = await findEntity('user', ['*'], ['id', input.userId]);
  // Check if this user  exists
  if (findUser.length === 0) {
    console.error('User does not exists!');
    return res.status(400).json({ message: 'User does not exists' });
  }

  const orderId = cuid();
  let finalAmount = 0;

  await Promise.all(
    input.orderItems.map(async (item) => {
      const orderItemsInput = {
        orderId,
        orderQuantity: item.quantityNeeded,
        price: item.price,
        pictureUrl: item.pictureUrl,
        name: item.name,
        description: item.description,
        category: item.category,
        shopId: item.shopId,
        inventoryId: item.id,
      };

      finalAmount += (item.quantityNeeded * item.price);
      await createEntity('orderDetails', orderItemsInput);

      const inventory = await findEntity('inventory', ['*'], ['id', item.id]);
      await updateEntity('inventory', { quantity: (inventory[0].quantity - item.quantityNeeded) }, ['id', item.id]);
    }),
  );

  const orderInput = {
    orderId,
    status: 'ordered',
    orderedDate: new Date(),
    userId: input.userId,
    finalAmount,
  };

  await createEntity('order', orderInput);

  const response = [];
  const orders = await findEntity('order', ['*'], ['userId', input.userId]);

  await Promise.all(
    orders.map(async (order) => {
      const item = {};
      item.order = order;
      const orderDetails = await findEntity('orderDetails', ['*'], ['orderId', order.orderId]);
      item.orderDetails = orderDetails;
      response.push(item);
    }),
  );
  return res.status(200).json(response);
}

export async function getOrders(req, res) {
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const findUser = await findOneEntity(User, { _id: userId });
  // Check if this user  exists
  if (!findUser) {
    console.error('User does not exists!');
    return res.status(400).json({ message: 'User does not exists' });
  }
  const response = [];
  const orders = await findEntity(Order, { userId });

  await Promise.all(
    orders.map(async (order) => {
      const item = {};
      item.order = order;
      const orderDetails = await findEntity(OrderDetails, { orderId: order.orderId });
      item.orderDetails = orderDetails;
      response.push(item);
    }),
  );

  return res.status(200).json(response);
}
