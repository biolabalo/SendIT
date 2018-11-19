// /* eslint-disable camelcase */
import parcelOrders from '../model/parcelOrderDB';

export default class OrderController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} parcelOrderController object
   */

  // write middlware to ensure that all neccessary details are given bfore creation
  static createParcelOrder(req, res) {
    const {
      id,
      senderName,
      senderEmail,
      senderId,
      receiverName,
      receiverEmail,
      itemName,
      address,
      itemWeight,
      pickUpAddress,
      destinationAddress,
    } = req.body;

    const price = itemWeight * 50;
    const order = {
      id,
      senderName,
      senderEmail,
      senderId,
      receiverName,
      receiverEmail,
      itemName,
      itemWeight,
      price,
      address,
      pickUpAddress,
      destinationAddress,
    };
    parcelOrders.push(order);
    return res.status(200).json({ order });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} parcelOrderController object
   */
  static getAllParcelOrder(req, res) {
    return res.status(200).json({ allParcelOrders: parcelOrders });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} parcelOrderController object
   */

  // write middlware to ensure that user with the given id exist
  static getParcelOrderBySpecificUser(req, res) {
    const { userId } = req.params;
    const ParcelCreatedByUser = parcelOrders.filter(each => each.senderId === userId);
    return res.status(200).send({ ParcelCreatedByUser });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} parcelOrderController object
   */

  // write middlware to ensure parcelOrder with the given id exist
  static getParcelOrderById(req, res) {
    const { parcel_id } = req.params;
    const singleParcel = parcelOrders.filter(each => each.id === Number(parcel_id));
    return res.status(200).send({ singleParcel });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} parcelOrderController object
   */

  static cancelParcelOrder(req, res) {
    const { parcel_id } = req.params;
    const ParcelToBeCancelledArray = parcelOrders.filter(each => each.id === Number(parcel_id));
    const parcelToBeCancelled = ParcelToBeCancelledArray[0];
    parcelToBeCancelled.status = 'cancelled';
    return res.status(200).send(parcelToBeCancelled);
  }
}
