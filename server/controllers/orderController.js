import parcelOrderDB from '../model/parcelOrderDB';

import  { 
       verifyParcelOrderId,
       parcelOrderCreatedByUser,
         } from '../helpers';





export const  getAllParcelOrder = ( req , res ) => {

    res.status(200).json( { allParcelOrders: parcelOrderDB.parcelOrders});
   
 };



export const getParcelOrderById = ( req , res ) => {
       console.log('hit');
      const { parcel_order_id } = req.params;
     
      const doesParcelOrderIdExist  = verifyParcelOrderId(parcel_order_id); 
      
      if(!doesParcelOrderIdExist)  return res.status(404).send({ message: 'parcelOrder not found' });
      
      res.status(200).json({ result: doesParcelOrderIdExist });
   

 };



export const getParcelOrderBySpecificUser = ( req , res ) => {

      const { userId } = req.params;
      console.log(userId);
      const doesParcelOrderExist  = parcelOrderCreatedByUser(userId); 
    
      if(!doesParcelOrderExist)  return res.status(404).send({ message: 'parcelOrder not found' });
      
      res.status(200).json({ result: doesParcelOrderExist });
   
 };

  
 export const verifyParcelOrderIdExist  = ( req , res , next  ) => {

      const { parcel_order_id } = req.params;
     
      const doesParcelOrderIdExist  = verifyParcelOrderId(parcel_order_id); 
    
      if(!doesParcelOrderIdExist)  return res.status(404).send({ message: 'parcelOrder not found' });
      
      next();
 };




 export const cancelParcelOrder  = ( req , res ) => {
     
      const { parcel_order_id } = req.params;
     
      const doesParcelOrderIdExist  = verifyParcelOrderId(parcel_order_id); 
   
         
 };
