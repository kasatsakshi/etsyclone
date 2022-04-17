import express from 'express';
import login from './login';
import signup from './signup';
import upload from './upload';
import { user, update, updateCurrency } from './user';
import {
  createShopProduct, createShop, getShop, isShopNameAvailable, getShopCategories, updateShopProduct,
} from './shop';
import {
  deleteFavoriteProduct, favoriteProduct, getProducts, getUserFavorites, searchProductsByName,
} from './products';
import { createOrder, getOrders } from './order';

import passport from '../helpers/passport';

const router = new express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', passport.authenticate('jwt', { session: false }), user);
router.put('/user/update', passport.authenticate('jwt', { session: false }), update);
router.put('/user/update/currency', passport.authenticate('jwt', { session: false }), updateCurrency);
router.post('/upload', upload);
router.get('/shop/:id', getShop);
router.post('/shop/name/', isShopNameAvailable);
router.post('/shop/create', createShop);
router.post('/shop/product/create', createShopProduct);
router.post('/shop/product/update', updateShopProduct);
router.get('/shop/:shopId/categories', getShopCategories);
router.get('/products', getProducts);

router.post('/product/favorite', favoriteProduct);
router.post('/product/favorite/delete', deleteFavoriteProduct);
router.get('/user/favorites', passport.authenticate('jwt', { session: false }), getUserFavorites);

router.get('/product/search/:name', searchProductsByName);

router.post('/order', createOrder);
router.get('/orders/:id', getOrders);

export default router;
