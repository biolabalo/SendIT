/* eslint-disable require-jsdoc */

import createFunctionValidators from './createFunctionValidators';
const {validateAddress} = createFunctionValidators;

export default class verifyAddresssclass {
  // eslint-disable-next-line require-jsdoc
  static verifyAddresss(req, res, next) {
    if (!validateAddress(req.body.destinationAddress || req.body.currentLocation)) {
      return res.status(400).json({
        error: 'Address cannot be empty and must be at least five characters',
      });
    }
    next();
  }
}
