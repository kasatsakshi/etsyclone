import {
  findEntity, findOneEntity,
} from '../models';
import { decodeToken } from '../helpers/auth';
import Shop from '../models/shop';
import User from '../models/users';
import Inventory from '../models/inventory';
import OrderDetails from '../models/orderDetails';

export const shop = async (token, callback) => {
 const payload = await decodeToken(token);
 const id = payload.data.id;

 if (!id) {
   console.error('User id is missing');
   const response = {
    message: 'User does not exists!',
    status: 400,
  }
  callback(null, response);
 }

 const user = await findOneEntity(User, { _id: id });
 // Check if this user exists
 if (!user) {
   console.error('User does not exists!');
   const response = {
    message: 'User does not exists!',
    status: 400,
  }
  callback(null, response);
 }

 const shop = await findOneEntity(Shop, { userId: id });
 let inventory = [];
 if (shop) {
   inventory = await findEntity(Inventory, { shopId: shop._id });
 }

 const data = {
   user,
   shop,
   inventory,
 };

 let total = 0;
 await Promise.all(
   inventory.map(async (item) => {
     const temp = await findEntity(OrderDetails, { inventoryId: item._id }, ['orderQuantity']);
     total += temp.length;
   }),
 );
 data.totalSales = total;

 const response = {
    message: data,
    status: 200,
  }

  callback(null, response);

}