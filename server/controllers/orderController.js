/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
// /* eslint-disable camelcase */
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db/dbconnect';
import createFunctionValidators from '../helpers/createFunctionValidators';

const { validateAddress } = createFunctionValidators;

export default class OrderController {
  /**
   * Get All ParcelOrders
   * @param {object} req
   * @param {object} res
   * @returns {object} parcelOrder array
   */
  static async getAllParcelOrders(req, res) {
    try {
      const result = await db('SELECT * FROM parcelorders ORDER BY item_name ASC');
      return res.status(200).send({
        status: 200,
        data: result.rows,
      });
    } catch (error) {
      return res.status(400).send({ status: 400, error });
    }
  }

  /**
   * Create A parcel Order
   * @param {object} req
   * @param {object} res
   * @returns {object} parcelOrderController object
   */
  static async createParcelOrder(req, res) {
console.log(req.user)
    const { isAdmin } = req.user;
    if (isAdmin) {
      return res.status(403).json({
        status: 403,
        message: "Access denied, you don't have the required credentials to access this route",
      });
    }
    const text = `INSERT INTO
     parcelorders( id,
      sender_id,
      item_name,
      destination_address, 
      pickup_address,
      currentLocation, 
      created_date, 
      receiver_name, 
      receiver_email, 
      item_weight, 
      status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9 , $10 , $11 ) returning *`;

    const values = [
      uuidv4(),
      req.user.userId,
      req.body.itemName,
      req.body.destinationAddress,
      req.body.pickUpAddress,
      req.body.pickUpAddress,
      moment(new Date()),
      req.body.receiverName,
      req.body.receiverEmail,
      req.body.itemWeight,
      'Placed',
    ];
console.log('bbbb',values);
    try {
      const { rows } = await db(text, values);
      return res.status(201).send({
        status: 201,
        data: [{
          message: 'order created',
          order: rows[0],
        }],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * get  A parcel Order
   * @param {object} req
   * @param {object} res
   * @returns {object} parcelOrderController object
   */
  static async getParcelOrderById(req, res) {
    const { parcel_id } = req.params;
    const text = 'SELECT * FROM parcelorders WHERE id = $1';

    try {
      const { rows } = await db(text, [parcel_id]);
      if (req.user.userId !== rows[0].sender_id) {
        res.status(403).send({ message: 'Only Users Who created the resource Can Access' });
      } else {
        res.status(200).send({
          success: true,
          message: `Order '${parcel_id}' retrieved.`,
          orders: rows[0],
        });
      }
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Parcel Order not Found',
      });
    }
  }

  /**
     * cancel A parcelOrder
     * @param {object} req
     * @param {object} res
     * @returns {object} parcelOrderController object
     */
  static async cancelParcelOrder(req, res) {
    const { parcel_id } = req.params;
    const text1 = 'SELECT * FROM parcelorders WHERE id = $1';
    const text = 'UPDATE parcelorders SET status=\'cancelled\' WHERE id = $1 RETURNING *';
    try {
      const { rows: result } = await db(text1, [parcel_id]);
      if (req.user.userId !== result[0].sender_id) {
        return res.status(403).json({
          status: 403,
          message: "Access denied, you don't have the required credentials to access this route",
        });
      }
      if (result[0].status === 'In Transit' || result[0].status === 'Placed') {
        const { rows } = await db(text, [parcel_id]);
        res.status(200).send({
          success: true,
          orders: rows[0],
        });
      } else {
        return res.status(200).send({
          status: 200,
          success: false,
          message: 'You can no longer cancel this parcel Order',
        });
      }
    } catch (error) {
      return res.status(400).send({
        status: 400,
        success: false,
        message: 'Parcel Order not Found',
      });
    }
  }


  /**
   * change   A parcel Order Destination
   * @param {object} req
   * @param {object} res
   * @returns {object} parcelOrderController object
   */
  static async changeParcelDestination(req, res) {
    const { destinationAddress } = req.body;
    const { parcel_id } = req.params;

    const text = 'UPDATE parcelorders SET destination_address=$1 WHERE id=$2 RETURNING *';

    try {
      const { rows } = await db('SELECT * FROM parcelorders WHERE id = $1', [parcel_id]);
      if (req.user.userId !== rows[0].sender_id) {
        res.status(403).send({ message: 'Only Users Who created the resource Can Access' });
      }
      if (rows[0].status === 'Placed') {
        const { rows } = await db(text, [destinationAddress, parcel_id]);
        res.status(200).send({
          status: 200,
          success: true,
          orders: rows[0],
        });
      }
      if (rows[0].status === 'In Transit') {
        const { rows } = await db(text, [destinationAddress, parcel_id]);
        res.status(200).send({
          status: 200,
          success: true,
          orders: rows[0],
        });
      }
      if (rows[0].status === 'cancelled' || rows[0].status === 'Delivered') {
        return res.status(401).send({
          status: 401,
          success: false,
          message: 'You Cannot Change Destination',
        });
      }
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Parcel Order not Found',
      });
    }
  }




  static async changeParcelStatus(req, res) {
    const { status } = req.body;
    const { parcel_id } = req.params;
    const text = 'UPDATE parcelorders SET status=$1  WHERE id=$2 RETURNING *';

    // eslint-disable-next-line quotes
    if (status === "In Transit" || status === "Delivered" || status === "Placed") {
      
      try {
        let { rows } = await db('SELECT * FROM parcelorders WHERE id = $1', [parcel_id]);
  
        if (!rows[0] || rows[0].status === 'cancelled' || rows[0].status === 'Delivered') {
          return res.status(409).json({ status: 409, error: 'invalid request' });
        }
        
        const result = await db(text, [status, parcel_id]);
        
        res.status(200).json(result.rows[0]);
      } catch (error) {
        return res.status(400).send({
          success: false,
          message: 'Parcel Order not Found',
        });
      }
    } else {
      return res.status(400).send({
        error: 400,
        success: false,
        message: 'The Format for status are "In Transit", "Delivered", "Placed" ',
      });

    }
  }

  static async changeCurrentLocation(req, res) {
    const { currentLocation } = req.body;
    const { parcel_id } = req.params;

    const text = 'UPDATE parcelorders SET currentLocation=$1 WHERE id=$2 RETURNING *';

    try {
      const { rows } = await db('SELECT * FROM parcelorders WHERE id = $1', [parcel_id]);
      
     if (!rows[0] || rows[0].status === 'cancelled' || rows[0].status === 'Delivered') {
        return res.status(400).json({ status: 400, error: 'Parcel is either cancelled or has been delivered' });
      }


      if (rows[0].status === 'Placed') {
        const { rows } = await db(text, [currentLocation, parcel_id]);
        res.status(200).send({
          status: 200,
          success: true,
          orders: rows[0],
        });
      }
      if (rows[0].status === 'In Transit') {
        const { rows } = await db(text, [currentLocation, parcel_id]);
        res.status(200).send({
          status: 200,
          success: true,
          orders: rows[0],
        });
      }
  
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Parcel Order not Found',
      });
    }
  }
}
