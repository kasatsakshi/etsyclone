import cuid from 'cuid';
import {
  findEntity, findOneEntity, createEntity, updateOneEntity,
} from '../models';
import User from '../models/users';
import OrderDetails from '../models/orderDetails';
import { decodeToken } from '../helpers/auth';
import Order from '../models/order';
import Inventory from '../models/inventory';

export const getOrders = async (token, callback) => {
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const findUser = await findOneEntity(User, { _id: userId });
  // Check if this user  exists
  if (!findUser) {
    console.error('User does not exists!');
    const response = {
      message: 'User does not exists',
      status: 400,
    };
    callback(null, response);
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
  };

  callback(null, response);
};

export const createOrder = async (inputPayload, callback) => {
  const { input, token } = inputPayload;
  const payload = await decodeToken(token);
  const userId = payload.data.id;

  const findUser = await findOneEntity(User, { _id: userId });
  // Check if this user  exists
  if (!findUser) {
    console.error('User does not exists!');
    const response = {
      message: 'User does not exists',
      status: 400,
    };
    callback(null, response);
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
        isGift: item.isGift,
        giftMessage: item.giftMessage,
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
  };

  callback(null, response);
};
