import express from 'express';
import signup from './signup';

const router = new express.Router();

router.post('/signup', signup);

export default router;
