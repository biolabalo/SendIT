import db from '../db/dbconnect';


class userControllerClass {
  static async getParcelOrderBySpecificUser(req, res) {
    const { userId } = req.params;
    if (req.user.userId !== userId) return res.status(403).json({ message: 'Access denied. You are forbidden from accessing this route.' });
    try {
      const result = await db('SELECT * FROM parcelOrders WHERE userId = $1', [userId]);
      if (result.rows.length === 0) return res.status(404).json({ message: 'No orders found for user' });
      res.status(200).json(result.rows);
    } catch (error) {
      return res.status(400).send({ status: 400, error: 'user Id does not exist ' });
    }
  }
}

export default userControllerClass;
