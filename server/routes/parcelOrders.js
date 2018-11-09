import express from 'express';
import { validateCreateParcelData } from '../helpers';

import {
  getAllParcelOrder,
  getParcelOrderById,
  getParcelOrderBySpecificUser,
  verifyParcelOrderIdExist,
  cancelParcelOrder,
  saveParcelOrder,
} from '../controllers/orderController';


const router = express.Router();

router.get('/parcels', getAllParcelOrder);

// http://localhost:5000/api/v1/parcels/234
router.get('/parcels/:parcel_id', getParcelOrderById);

// http://localhost:5000/api/v1/users/123abi3/parcels
router.get('/users/:userId/parcels', getParcelOrderBySpecificUser);

// http://localhost:5000/api/v1/parcels/1/cancel
router.put('/parcels/:parcel_id/cancel', verifyParcelOrderIdExist, cancelParcelOrder);

// http://localhost:5000/api/v1/parcels
router.post('/parcels', validateCreateParcelData, saveParcelOrder);

export default router;
