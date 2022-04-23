import express from 'express';
import upload from './upload';
import { update } from './user';
import {
  createShopProduct, createShop, isShopNameAvailable, updateShopProduct,
} from './shop';

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

router.post('/signup', async (req, res) => {
  makeRequest('signup', req.body, (err, results) => {
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
router.put('/user/update/currency', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const token = req.headers.authorization;
  const request = {
    token,
    input: req.body,
  };
  makeRequest('updateCurrency', request, (err, results) => {
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

router.get('/shop/:shopId/categories', passport.authenticate('jwt', { session: false }), async (req, res) => {
  makeRequest('category', req.params, (err, results) => {
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

router.get('/products', async (req, res) => {
  makeRequest('product', req.body, (err, results) => {
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

router.post('/product/favorite', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const token = req.headers.authorization;
  const request = {
    token,
    input: req.body,
  };
  makeRequest('favoriteProduct', request, (err, results) => {
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

router.post('/product/favorite/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const token = req.headers.authorization;
  const request = {
    token,
    input: req.body,
  };
  makeRequest('deleteFavoriteProduct', request, (err, results) => {
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

router.get('/user/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const token = req.headers.authorization;
  makeRequest('favorite', token, (err, results) => {
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

router.get('/product/search/:name', async (req, res) => {
  makeRequest('productSearch', req.params, (err, results) => {
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

router.post('/order', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const token = req.headers.authorization;
  const request = {
    token,
    input: req.body,
  };
  makeRequest('createOrder', request, (err, results) => {
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

router.get('/orders', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const token = req.headers.authorization;
  makeRequest('order', token, (err, results) => {
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

export default router;
