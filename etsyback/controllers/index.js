import express from 'express';
import signup from './signup';
import upload from './upload';
import { update, updateCurrency } from './user';
import {
  createShopProduct, createShop, isShopNameAvailable, getShopCategories, updateShopProduct,
} from './shop';
import {
  deleteFavoriteProduct, favoriteProduct, getProducts, getUserFavorites, searchProductsByName,
} from './products';
import { createOrder, getOrders } from './order';

import passport from '../helpers/passport';
import { makeRequest } from '../kafka/client';

const router = new express.Router();

router.post('/login', async (req, res) => {
  makeRequest('login', req.body, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: 'System error, try again',
      });
    } else {
      const { token, message, status } = results;
      res.set({
        'X-Auth-Token': token,
      });
      if (status !== 200) {
        res.status(status).json({ message });
      } else {
        res.status(status).json(message);
      }
      res.end();
    }
  });
});

router.post('/signup', signup);
router.get('/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const token = req.headers.authorization;
  makeRequest('user', token, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: 'System error, try again',
      });
    } else {
      const { message, status } = results;
      if (status !== 200) {
        res.status(status).json({ message });
      } else {
        res.status(status).json(message);
      }
      res.end();
    }
  });
});
router.put('/user/update', passport.authenticate('jwt', { session: false }), update);
router.put('/user/update/currency', passport.authenticate('jwt', { session: false }), updateCurrency);
router.post('/upload', passport.authenticate('jwt', { session: false }), upload);
router.get('/shop', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const token = req.headers.authorization;
  makeRequest('shop', token, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: 'System error, try again',
      });
    } else {
      const { message, status } = results;
      if (status !== 200) {
        res.status(status).json({ message });
      } else {
        res.status(status).json(message);
      }
      res.end();
    }
  });
});
router.post('/shop/name', passport.authenticate('jwt', { session: false }), isShopNameAvailable);
router.post('/shop/create', passport.authenticate('jwt', { session: false }), createShop);
router.post('/shop/product/create', passport.authenticate('jwt', { session: false }), createShopProduct);
router.post('/shop/product/update', passport.authenticate('jwt', { session: false }), updateShopProduct);
router.get('/shop/:shopId/categories', passport.authenticate('jwt', { session: false }), getShopCategories);
router.get('/products', getProducts);

router.post('/product/favorite', passport.authenticate('jwt', { session: false }), favoriteProduct);
router.post('/product/favorite/delete', passport.authenticate('jwt', { session: false }), deleteFavoriteProduct);
router.get('/user/favorites', passport.authenticate('jwt', { session: false }), getUserFavorites);

router.get('/product/search/:name', searchProductsByName);

router.post('/order', passport.authenticate('jwt', { session: false }), createOrder);
router.get('/orders', passport.authenticate('jwt', { session: false }), getOrders);

export default router;
