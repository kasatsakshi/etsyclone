import express from 'express';
import login from './login';
import signup from './signup';
import upload from './upload';
import { user, update } from "./user";
import { createShopProduct, createShop, getShop, isShopNameAvailable, getShopCategories, updateShopProduct } from './shop';
import { deleteFavoriteProduct, favoriteProduct, getProducts, getUserFavorites, searchProductsByName } from './products';

const router = new express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/user', user);
router.post('/user/update', update);
router.post('/upload', upload);
router.get('/shop/:id', getShop)
router.post('/shop/name/', isShopNameAvailable)
router.post('/shop/create', createShop)
router.post('/shop/product/create', createShopProduct)
router.post('/shop/product/update', updateShopProduct)
router.get('/shop/:shopId/categories', getShopCategories)
router.get('/products', getProducts)

router.post('/product/favorite', favoriteProduct);
router.post('/product/favorite/delete', deleteFavoriteProduct);
router.get('/user/:id/favorites', getUserFavorites);

router.get('/product/search/:name', searchProductsByName);

export default router;
