import express from 'express';
import login from './login';
import signup from './signup';

const router = new express.Router();

router.post('/signup', signup);
router.post('/login', login);


export default router;
