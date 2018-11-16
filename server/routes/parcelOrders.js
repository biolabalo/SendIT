import express from 'express';
import Helper from '../helpers';
import validator from '../helpers/createOrderValidator';
import OrderController from '../controllers/orderController';

const router = express.Router();

const { validateCreateParcelData } = validator;
const { verifyParcelId, isAuthorizedToCancel } = Helper;
const {
  getParcelOrderById,
  cancelParcelOrder,
  createParcelOrder,
  getAllParcelOrder,
} = OrderController;

router.get('/parcels', getAllParcelOrder);

// http://localhost:5000/api/v1/parcels/234
router.get('/parcels/:parcel_id',
  verifyParcelId,
  getParcelOrderById);

// http://localhost:5000/api/v1/parcels/1/cancel
router.put('/parcels/:parcel_id/cancel',
  verifyParcelId,
  isAuthorizedToCancel,
  cancelParcelOrder);

// http://localhost:5000/api/v1/parcels
router.post('/parcels',
  validateCreateParcelData,
  createParcelOrder);

export default router;
