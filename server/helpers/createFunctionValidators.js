export default class createFunctionValidators {
  static checkValidEmail(email) {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = reg.test(String(email).toLowerCase());
    if (!isValid) return false;
    return true;
  }

  static isNumber(number) {
    return !isNaN(number);
  }

  static validateAddress(string) {
    if (typeof string !== 'string') return false;
    if (string.length < 5 || string.length > 350) return false;
    return true;
  }

 
}
