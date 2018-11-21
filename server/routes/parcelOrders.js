import express from 'express';
import validator from '../helpers/createOrderValidator';
import OrderController from '../controllers/orderController';

const router = express.Router();

const { validateCreateParcelData } = validator;

const {
  getParcelOrderById,
  cancelParcelOrder,
  createParcelOrder,
  getAllParcelOrder,
} = OrderController;

router.get('/', getAllParcelOrder);

// http://localhost:5000/api/v1/parcels/234
router.get('/:parcel_id',
  getParcelOrderById);

// http://localhost:5000/api/v1/parcels/1/cancel
router.put('/:parcel_id/cancel',
  cancelParcelOrder);

// http://localhost:5000/api/v1/parcels
router.post('/',
  // validateCreateParcelData,
  createParcelOrder);

export default router;
