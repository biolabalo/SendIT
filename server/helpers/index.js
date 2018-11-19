import parcelOrders from '../model/parcelOrderDB';

export default class Helper {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} parcelOrderController object
   */

  static verifyParcelId(req, res, next) {
    const { parcel_id } = req.params;
    const singleParcel = parcelOrders.filter(each => each.id === Number(parcel_id));
    if (singleParcel.length === 0) return res.status(404).send({ message: 'Parcel Not Found' });
    return next();
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} parcelOrderController object
   */

  static verifyUserIdExist(req, res, next) {
    const { userId } = req.params;
    const ParcelCreatedByUser = parcelOrders.filter(each => each.senderId === userId);
    if (ParcelCreatedByUser.length === 0) return res.status(404).send({ message: 'user not found' });
    return next();
  }

  static isAuthorizedToCancel(req, res, next) {
    const { parcel_id } = req.params;
    const singleParcelArray = parcelOrders.filter(each => each.id === Number(parcel_id));
    const singleParcel = singleParcelArray[0];
    if (singleParcel.status !== 'pending') return res.status(401).send({ message: 'You cannot cancel parcel order' });
    return next();
  }
}
