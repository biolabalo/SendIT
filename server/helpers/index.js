import parcelOrderDB from '../model/parcelOrderDB';


export const verifyParcelOrderId = (id) => {
  const { parcelOrders } = parcelOrderDB;
  const singleParcel = parcelOrders.filter(each => each.id === id);
  return singleParcel.length === 0 ? false : singleParcel;
};


export const parcelOrderCreatedByUser = (id) => {
  const { parcelOrders } = parcelOrderDB;
  const ParcelCreatedByUser = parcelOrders.filter(each => each.senderId === id);
  return ParcelCreatedByUser.length === 0 ? false : ParcelCreatedByUser;
};


// eslint-disable-next-line no-restricted-globals
export const isNumber = number => !isNaN(number);

export const validateString = (string) => {
  if (typeof string !== 'string') return false;
  if (string.length < 3 || string.length > 250) return false;
  const validString = /^[a-zA-Z-'\s\d]+$/;
  return string.trim().match(validString);
};

export const validateAddress = (string) => {
  if (typeof string !== 'string') return false;
  if (string.length < 5 || string.length > 250) return false;
  return true;
};

export const checkValidEmail = (email) => {
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
    pickUpAddress,
    destinationAddress,
  } = req.body;


  if (!validateString(receiverName)) {
    return res.status(400).json({
      error: 'name cannot be empty and must be at least three characters',
    });
  }
  if (!checkValidEmail(receiverEmail)) {
    return res.status(400).json({
      error: 'email is invalid',
    });
  }

  if (!validateString(itemName)) {
    return res.status(400).json({
      error: 'parcel name cannot be empty and must be at least three characters',
    });
  }

  if (itemWeight <= 0 || !isNumber(itemWeight)) {
    return res.status(400).json({
      error:
        'invalid input. The weight cannot be empty  must be greater than zero and a number',
    });
  }


  if (!validateAddress(pickUpAddress)) {
    return res.status(400).json({
      error: 'pick up address cannot be empty and must be at least five characters',
    });
  }
  if (!validateAddress(destinationAddress)) {
    return res.status(400).json({
      error: 'Destination address cannot be empty and must be at least five characters',
    });
  }

  return next();
};
