import express from 'express';
import login from './login';
import signup from './signup';
import upload from './upload';
import user from "./user";
import { getShop } from './shop';

const router = new express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/user', user);
router.post('/upload', upload);
router.get('/shop/:id', getShop)

export default router;
