import moment from 'moment';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
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
      return res.status(400).send({ status: 404, error: 'Some values are missing' });
    }
    if (!userAuthHelper.isWhiteSpace(req.body.email, req.body.password, req.body.confirmPassword)) {
      return res.status(400).send({ status: 404, error: 'White Space are not allowed in input fields' });
    }
    if (typeof req.body.fullname !== 'string') {
      return res.status(400).send({ status: 404, error: 'Full Name Is Invalid' });
    }
    if (!userAuthHelper.isValidEmail(req.body.email)) {
      return res.status(400).send({ status: 404, error: 'Please enter a valid email address' });
    }
    if (!userAuthHelper.ispasswordValid(req.body.password)) {
      return res.status(400).send({ status: 404, error: 'Password Must Be at least Five Characters' });
    }
    if (!userAuthHelper.doesPasswordMatch(req.body.password, req.body.confirmPassword)) {
      return res.status(400).send({ status: 404, error: 'Passwords Do not match' });
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
}

export default userAuthControllerClass;
