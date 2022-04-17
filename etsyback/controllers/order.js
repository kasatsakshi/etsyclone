import cuid from 'cuid';
import { findEntity, createEntity, updateEntity } from '../models';

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
  const { id } = req.params;
  const findUser = await findEntity('user', ['*'], ['id', id]);
  // Check if this user  exists
  if (findUser.length === 0) {
    console.error('User does not exists!');
    return res.status(400).json({ message: 'User does not exists' });
  }
  const response = [];
  const orders = await findEntity('order', ['*'], ['userId', id]);

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
