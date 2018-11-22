import bcrypt from 'bcrypt';

const userAuthHelper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * ispassword valid helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
  ispasswordValid(password) {
    if (password.length > 4) return true;
    return false;
  },
  /**
   * doesPasswordMatchvalid helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
  doesPasswordMatch(password, confrimPassword) {
    if (password === confrimPassword) return true;
    return false;
  },
  isWhiteSpace(email, password, confirmPassword) {
    if (email.includes(' ')) return false;
    if (typeof password === 'string' && password.includes(' ')) return false;
    if (typeof confirmPassword === 'string' && confirmPassword.includes(' ')) return false;
    return true;
  },
};

export default userAuthHelper;
