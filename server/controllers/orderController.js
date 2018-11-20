// /* eslint-disable camelcase */
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db/dbconnect';

export default class OrderController {
  /**
   * Get All ParcelOrders
   * @param {object} req
   * @param {object} res
   * @returns {object} parcelOrder array
   */
  static async getAllParcelOrder(req, res) {
    const findAllQuery = 'SELECT * FROM parcelorders';
    try {
      const { rows, rowCount } = await db(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * Create A parcel Order
   * @param {object} req
   * @param {object} res
   * @returns {object} parcelOrderController object
   */
  static async createParcelOrder(req, res) {
    const {
      id,
      receiverName,
      receiverEmail,
      itemName,
      itemWeight,
      pickUpAddress,
      destinationAddress,
      status,
      isDestinationChangedByAdmin,
    } = req.body;
    const price = itemWeight * 50;

    const text = `INSERT INTO
    parcelorders(id,
       item_name,
       destination_address,
       pickup_address,
       created_date,
       receiver_name,
       receiver_email,
       item_weight,
       status,
       isDestinationChangedByAdmin)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9 ,$10)
      returning *`;

    const values = [
      uuidv4(),
      itemName,
      destinationAddress,
      pickUpAddress,
      moment(new Date()),
      receiverName,
      receiverEmail,
      itemWeight,
      'In Transit',
      false,
    ];
    try {
      const { rows } = await db(text, values);
      return res.status(201).send({
        success: true,
        message: 'Order created successfully.',
        order: rows[0],
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
      res.status(200).send({
        success: true,
        message: `Order '${parcel_id}' retrieved.`,
        orders: rows[0],
      });
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
      if (result[0].status !== 'In Transit') {
        return res.status(401).send({
          success: false,
          message: 'You Cannot Change Status',
        });
      }
      const { rows } = await db(text, [parcel_id]);
      res.status(200).send({
        success: true,
        orders: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Parcel Order not Found',
      });
    }
  }
}
