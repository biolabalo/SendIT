import createFunctionValidators from './createFunctionValidators';

const {
  validateString,
  checkValidEmail,
  isNumber,
  validateAddress,
} = createFunctionValidators;

export default class validator {
  static validateCreateParcelData(req, res, next) {
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

    if (!validateAddress(pickUpAddress) || !validateAddress(destinationAddress)) {
      return res.status(400).json({
        error: 'Address cannot be empty and must be at least five characters',
      });
    }
    return next();
  }
}
