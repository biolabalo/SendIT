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




export const isNumber = number => {
  return !isNaN(number);
};

export const validateString = string => {
  if (typeof string !== 'string') return false;
  if (string.length < 2 || string.length > 250) return false;
  const validString = /^[a-zA-Z-'\s\d]+$/;
  return string.trim().match(validString);
};

export const checkValidEmail = email => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = reg.test(String(email).toLowerCase());
  if (!isValid) return false;
  return true;
};



export const validateCreateParcelData = (req, res, next) => {
 const {
    receiverName,
    receiverEmail,
    itemName,
    itemWeight,
    address,
  } = req.body;


    
  if (!validateString(receiverName)) {
    return res.status(400).json({
      error: 'name cannot be empty'
    });
  }
  if (!checkValidEmail(receiverEmail)) {
    return res.status(400).json({
      error: 'email is invalid'
    });
  }

  if (!validateString(itemName)) {
    return res.status(400).json({
      error: 'parcel name cannot be empty'
    });
  }

  if ( itemWeight <= 0 || !isNumber( itemWeight)) {
    return res.status(400).json({
      error:
        'invalid input. The weight cannot be empty and must be greater than zero'
    });
  }
  if (!validateString(address)) {
    return res.status(400).json({
      error: 'address cannot be empty'
    });
  }


  return next();
};

