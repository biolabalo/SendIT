import express from 'express';

import userAuthControllerClass from '../controllers/userAuthController';

const { createUser, login } = userAuthControllerClass;

const router = express.Router();

// http://localhost:5000/api/v1/auth/signup
router.post('/signup', createUser);

// http://localhost:5000/api/v1/auth/login
router.post('/login', login);
export default router;
