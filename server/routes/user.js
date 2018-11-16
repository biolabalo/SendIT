import express from 'express';
import Helper from '../helpers';
import OrderController from '../controllers/orderController';

const router = express.Router();

const { verifyUserIdExist } = Helper;

const { getParcelOrderBySpecificUser } = OrderController;

// http://localhost:5000/api/v1/users/463acp4/parcels
router.get('/users/:userId/parcels',
  verifyUserIdExist,
  getParcelOrderBySpecificUser);

export default router;
