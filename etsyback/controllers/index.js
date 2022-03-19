import express from 'express';
import login from './login';
import signup from './signup';
import upload from './upload';
import user from "./user";
import { createShopProduct, createShop, getShop, isShopNameAvailable, getShopCategories } from './shop';

const router = new express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/user', user);
router.post('/upload', upload);
router.get('/shop/:id', getShop)
router.post('/shop/name/', isShopNameAvailable)
router.post('/shop/create', createShop)
router.post('/shop/product/create', createShopProduct)
router.get('/shop/:shopId/categories', getShopCategories)

export default router;
