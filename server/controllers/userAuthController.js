import moment from 'moment';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import db from '../db/dbconnect';
import userAuthHelper from '../helpers/userAuth';

class userAuthControllerClass {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  static async createUser(req, res) {

    if (!req.body.email || !req.body.password || !req.body.confirmPassword || !req.body.fullname) {
      return res.status(400).send({ status: 400, error: 'Some values are missing' });
    }
    if (!userAuthHelper.isWhiteSpace(req.body.email, req.body.password, req.body.confirmPassword)) {
      return res.status(400).send({ status: 400, error: 'White Space are not allowed in input fields' });
    }
    if (typeof req.body.fullname !== 'string') {
      return res.status(400).send({ status: 400, error: 'Full Name Is Invalid' });
    }
    if (!userAuthHelper.isValidEmail(req.body.email)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid email address' });
    }
    if (!userAuthHelper.ispasswordValid(req.body.password)) {
      return res.status(400).send({ status: 400, error: 'Password Must Be at least Five Characters And Must Be A string' });
    }
    if (!userAuthHelper.doesPasswordMatch(req.body.password, req.body.confirmPassword)) {
      return res.status(400).send({ status: 400, error: 'Passwords Do not match' });
    }

    const {
      fullname,
      email,
      password,
    } = req.body;

    const createQuery = `INSERT INTO
      users(id, fullname, email, password, created_date)
      VALUES($1, $2, $3, $4, $5 )
      returning *`;

    const hashPassword = userAuthHelper.hashPassword(req.body.password);

    const values = [
      uuidv4(),
      fullname,
      email,
      hashPassword,
      moment(new Date()),
    ];

    try {
      const { rows } = await db(createQuery, values);
      const token = jwt.sign({ userId: rows[0].id, isAdmin: rows[0].isadmin },
        process.env.jwt_privateKey,
        { expiresIn: '7d' });
      return res.status(201).header('x-auth-token', token).json({
        status: 201,
        data: [{
          token,
          user: rows[0],
        }],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).send({ status: 200, message: 'User with that EMAIL already exist' });
      }
      res.json({ status: 200, error });
    }
  }

  static async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(401).send({ status: 401, message: 'Some values are missing' });
    }
    if (!userAuthHelper.isValidEmail(req.body.email)) {
      return res.status(401).send({ status: 401, message: 'Please enter a valid email address' });
    }
    if (!userAuthHelper.ispasswordValid(req.body.password)) {
      return res.status(401).send({ status: 401, error: 'Password Must Be at least Five Characters' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(401).send({ status: 401, message: 'Invalid Email / Password' });
      }
      if (!userAuthHelper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(401).send({ status: 401, message: 'The credentials you provided Are incorrect' });
      }
      const token = jwt.sign({ userId: rows[0].id, isAdmin: rows[0].isadmin },
        process.env.jwt_privateKey);

      return res.status(200).header('x-auth-token', token).json({
        status: 200,
        data: [{
          token,
          user: rows[0],
          message: `Welcome ${rows[0].fullname}`,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        error: 400,
        message: 'incorrect credentials',
      });
    }
  }
}

export default userAuthControllerClass;
