import express from 'express';
import login from './login';
import signup from './signup';
import user from "./user";

const router = new express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', user);

export default router;
