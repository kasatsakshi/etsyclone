import cuid from 'cuid';
import {
  findEntity, findOneEntity, createEntity, updateOneEntity,
} from '../models';
import { decodeToken } from '../helpers/auth';
import User from '../models/users';
import Order from '../models/order';
import OrderDetails from '../models/orderDetails';
import Inventory from '../models/inventory';

export async function createOrder(req, res) {
  const input = req.body;
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const userId = payload.data.id;

  const findUser = await findOneEntity(User, { _id: userId });
  // Check if this user  exists
  if (!findUser) {
    console.error('User does not exists!');
    return res.status(400).json({ message: 'User does not exists' });
  }

  const orderId = cuid();
  let finalAmount = 0;

  await Promise.all(
    input.orderItems.map(async (item) => {
      const orderItemsInput = new OrderDetails({
        orderId,
        orderQuantity: item.quantityNeeded,
        price: item.price,
        pictureUrl: item.pictureUrl,
        name: item.name,
        description: item.description,
        category: item.category,
        shopId: item.shopId,
        inventoryId: item._id,
      });

      finalAmount += (item.quantityNeeded * item.price);
      await createEntity(orderItemsInput);

      const inventory = await findOneEntity(Inventory, { _id: item._id });
      const updateQty = inventory.quantity - item.quantityNeeded;
      await updateOneEntity(Inventory, { _id: item._id }, { quantity: updateQty });
    }),
  );

  const orderInput = new Order({
    orderId,
    status: 'ordered',
    orderedDate: new Date(),
    userId,
    finalAmount,
  });

  await createEntity(orderInput);

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
