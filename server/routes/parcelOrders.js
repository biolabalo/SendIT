import express from 'express';
import validator from '../helpers/createOrderValidator';
import OrderController from '../controllers/orderController';
import verifyTokenObj from '../helpers/verifyTokenMiddleware';
import verifyIsAdminClass from '../helpers/verifyIsAdmin';
import verifyAddresssclass from '../helpers/validateAdress';

const router = express.Router();
const {verifyAddresss} = verifyAddresssclass;
const { validateCreateParcelData } = validator;
const { verifyToken } = verifyTokenObj;
const { verifyIsAdmin } = verifyIsAdminClass;
const {
  getParcelOrderById,
  cancelParcelOrder,
  createParcelOrder,
  getAllParcelOrders,
  changeParcelDestination,
  changeParcelStatus,
} = OrderController;

router.get('/', verifyToken, verifyIsAdmin, getAllParcelOrders);

// http://localhost:5000/api/v1/parcels/234
router.get('/:parcel_id', verifyToken,
  getParcelOrderById);

// http://localhost:5000/api/v1/parcels/1/cancel
router.put('/:parcel_id/cancel', verifyToken, cancelParcelOrder);

// http://localhost:5000/api/v1/parcels
router.post('/',
  verifyToken,
  validateCreateParcelData,
  createParcelOrder);

  // http://localhost:5000/api/v1/parcels/1/cancel
router.put('/:parcel_id/destination', verifyAddresss, verifyToken, changeParcelDestination);

 router.put('/:parcel_id/status', verifyToken, verifyIsAdmin, changeParcelStatus);

export default router;
