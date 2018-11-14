import express from 'express';
import Helper from '../helpers';
import { validateCreateParcelData } from '../helpers/createOrderValidator';
import OrderController from '../controllers/orderController';

const router = express.Router();

router.get('/parcels', OrderController.getAllParcelOrder);

// http://localhost:5000/api/v1/parcels/234
router.get('/parcels/:parcel_id',
  Helper.verifyParcelId,
  OrderController.getParcelOrderById);

// http://localhost:5000/api/v1/parcels/1/cancel
router.put('/parcels/:parcel_id/cancel',
  Helper.verifyParcelId,
  Helper.isAuthorizedToCancel,
  OrderController.cancelParcelOrder);

// http://localhost:5000/api/v1/parcels
router.post('/parcels',
  validateCreateParcelData,
  OrderController.createParcelOrder);

export default router;
