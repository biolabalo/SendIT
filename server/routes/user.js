import express from 'express';
import Helper from '../helpers';
import OrderController from '../controllers/orderController';

const router = express.Router();

// http://localhost:5000/api/v1/users/463acp4/parcels
router.get('/users/:userId/parcels',
  Helper.verifyUserIdExist,
  OrderController.getParcelOrderBySpecificUser);


export default router;
