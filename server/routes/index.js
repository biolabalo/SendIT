import express from 'express';


import {
  getAllParcelOrder,
  getParcelOrderById,
  getParcelOrderBySpecificUser,
  verifyParcelOrderIdExist,
  cancelParcelOrder,
} from '../controllers/orderController';


const router = express.Router();

router.get('/', getAllParcelOrder);

//http://localhost:5000/api/v1/parcelOrders/parcels/234
router.get('/parcels/:parcel_order_id', getParcelOrderById );

// http://localhost:5000/api/v1/parcelOrders/users/123abi3/parcels
router.get('/users/:userId/parcels',  getParcelOrderBySpecificUser );

//http://localhost:5000/api/v1/parcelOrders/parcels/1/cancel
router.put('/parcels/:parcel_order_id/cancel',
            verifyParcelOrderIdExist,
            cancelParcelOrder
            );


//router.delete('/:parcel_order_id', ParcelOrderController.deleteParcelOrder);

export default router;

