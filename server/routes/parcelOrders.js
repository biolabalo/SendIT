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




router.get('/',  (req, res) => {
  res.status(200).send({ message: 'welcome to SendIT' });
});

router.get('/parcels' , getAllParcelOrder );

//http://localhost:5000/api/v1/parcelOrders/parcels/234
router.get('/parcels/:parcel_order_id', getParcelOrderById );

// http://localhost:5000/api/v1/parcelOrders/users/123abi3/parcels
router.get('/users/:userId/parcels',  getParcelOrderBySpecificUser );

//http://localhost:5000/api/v1/parcelOrders/parcels/1/cancel
router.put('/parcels/:parcel_order_id/cancel',
            verifyParcelOrderIdExist,
            cancelParcelOrder,
            );

//http://localhost:5000/api/v1/parcelOrders/parcels
router.post('/parcels',
            validateCreateParcelData,
            saveParcelOrder, 
            );

export default router;

