import express from 'express';

import userAuthControllerClass from '../controllers/userController';

const { createUser } = userAuthControllerClass;

const router = express.Router();

// http://localhost:5000/api/v1/auth
router.post('/signup', createUser);

export default router;
