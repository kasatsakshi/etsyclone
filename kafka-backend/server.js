import mongoose from 'mongoose';

import config from './config';
import { ConnectionProvider } from './kafka/connection';

import { login } from './services/login';
import { updateCurrency, updateUser, user } from './services/user';
import {
  getShopCategories, getShop, isShopNameAvailable, createShop, createShopProduct, updateShopProduct,
} from './services/shop';
import {
  deleteFavoriteProduct, favoriteProduct, getProducts, getUserFavorites, searchProductsByName,
} from './services/product';
import { createOrder, getOrders } from './services/order';
import { signup } from './services/signup';
import { upload } from './services/upload';

// Connect to MongoDB
mongoose
  .connect(config.mongo.uri, config.mongo.connectionOptions)
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

mongoose.Promise = global.Promise;

function handleTopicRequest(topicName, fname) {
  const connection = new ConnectionProvider();
  const consumer = connection.getConsumer(topicName);
  const producer = connection.getProducer();
  console.log('kafka server is running ');
  consumer.on('message', (message) => {
    console.log(`message received for ${topicName}`);
    console.log(`Incoming message: ${JSON.stringify(message.value)}`);
    const data = JSON.parse(message.value);

    fname(data.data, (err, res) => {
      console.log(`after handle: ${res}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, (err, data) => {
        console.log(data);
      });
      return null;
    });
  });
}

handleTopicRequest('signup', signup);
handleTopicRequest('login', login);
handleTopicRequest('user', user);
handleTopicRequest('updateCurrency', updateCurrency);
handleTopicRequest('shop', getShop);
handleTopicRequest('product', getProducts);
handleTopicRequest('favorite', getUserFavorites);
handleTopicRequest('order', getOrders);
handleTopicRequest('category', getShopCategories);
handleTopicRequest('productSearch', searchProductsByName);
handleTopicRequest('favoriteProduct', favoriteProduct);
handleTopicRequest('deleteFavoriteProduct', deleteFavoriteProduct);
handleTopicRequest('createOrder', createOrder);
handleTopicRequest('isShopNameAvailable', isShopNameAvailable);
handleTopicRequest('createShop', createShop);
handleTopicRequest('createShopProduct', createShopProduct);
handleTopicRequest('updateShopProduct', updateShopProduct);
handleTopicRequest('updateUser', updateUser);
handleTopicRequest('upload', upload);
