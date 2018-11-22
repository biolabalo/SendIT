
import createFunctionValidators from './createFunctionValidators';
const {validateAddress} = createFunctionValidators;

export default class verifyAddresssclass{
    static verifyAddresss(req, res, next) {
       if(!validateAddress(req.body.destinationAddress)) {
            return res.status(400).json({
              error: 'Address cannot be empty and must be at least five characters',
            });
           }
      next();
    }
  }