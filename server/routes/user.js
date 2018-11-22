import express from 'express';
import userControllerClass from '../controllers/usersController';
import verifyTokenObj from '../helpers/verifyTokenMiddleware';

const { verifyToken } = verifyTokenObj;
const router = express.Router();

const { getParcelOrderBySpecificUser } = userControllerClass;

// http://localhost:5000/api/v1/users/463acp4/parcels
router.get('/:userId/parcels',
  verifyToken,
  getParcelOrderBySpecificUser);

export default router;
