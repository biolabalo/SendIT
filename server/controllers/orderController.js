import parcelOrderDB from '../model/parcelOrderDB';


import  { 
       verifyParcelOrderId,
       parcelOrderCreatedByUser,
         } from '../helpers';





export const  getAllParcelOrder = ( req , res ) => {

    res.status(200).json( { allParcelOrders: parcelOrderDB.parcelOrders});
   
 };



export const getParcelOrderById = ( req , res ) => {
     
      const { parcel_id } = req.params;
     
      const doesParcelOrderIdExist  = verifyParcelOrderId(parcel_id); 
      
      if(!doesParcelOrderIdExist)  return res.status(404).send({ message: 'parcelOrder not found' });
      
      res.status(200).json({ result: doesParcelOrderIdExist });
   

 };



export const getParcelOrderBySpecificUser = ( req , res ) => {

      const { userId } = req.params;

      const doesParcelOrderExist  = parcelOrderCreatedByUser(userId); 
    
      if(!doesParcelOrderExist)  return res.status(404).send({ message: 'parcelOrder not found' });
      
      res.status(200).json({ result: doesParcelOrderExist });
   
 };

  
 export const verifyParcelOrderIdExist  = ( req , res , next  ) => {

      const { parcel_id } = req.params;
     
      const doesParcelOrderIdExist  = verifyParcelOrderId(parcel_id); 
    
      if(!doesParcelOrderIdExist)  return res.status(404).send({ message: 'parcelOrder not found' });
      
      next();
 };




 export const cancelParcelOrder  = ( req , res ) => {
    
      const { parcel_id } = req.params;
     
      const parceltoBeCancelled  = verifyParcelOrderId(parcel_id); 
     
      const status = parceltoBeCancelled[0].status;
     
      const is_Destination_changed_ByAdmin = parceltoBeCancelled[0].isDestinationChangedByAdmin;
     
    
     if (  status === 'delivered'
          &&  is_Destination_changed_ByAdmin === true
          ||  status === 'cancelled'
        ){
        
       return  res.status(401).send({ message: 'You cannot cancel parcel order' });
        
      }else{
          
         parceltoBeCancelled[0].status = 'cancelled';
         res.status(200).send(parceltoBeCancelled[0]);
      };
      
 };

 
 export const saveParcelOrder =  ( req , res ) => {
     
     const { id, 
            senderName,
            senderEmail,
            senderId,
            receiverName,
            receiverEmail,
            itemName,
            address,
            itemWeight,
            pickUpAddress,
            destinationAddress, } = req.body;
     
    
    const price = itemWeight * 50;
    const order = {id, senderName, senderEmail, senderId, receiverName, receiverEmail, itemName, itemWeight, price }
 
       res.status(200).json({  order })
 };