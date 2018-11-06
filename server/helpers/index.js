import parcelOrderDB from '../model/parcelOrderDB';


export const verifyParcelOrderId  = (id) => {
   
    const { parcelOrders } = parcelOrderDB;
    
    const  singleParcel = parcelOrders.filter( each => each.id == id )
   
    return singleParcel.length === 0 ? false  :   singleParcel;
    
}


export const parcelOrderCreatedByUser = (id) => {

    const { parcelOrders } = parcelOrderDB;
    
    const  ParcelCreatedByUser =  parcelOrders.filter( each =>  each.senderId  ===  id  );
    
    return ParcelCreatedByUser.length === 0 ?  false  :  ParcelCreatedByUser;
    
};
