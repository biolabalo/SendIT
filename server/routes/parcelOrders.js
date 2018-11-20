import express from 'express';
import Helper from '../helpers';
import validator from '../helpers/createOrderValidator';
import OrderController from '../controllers/orderController';

const router = express.Router();

const { validateCreateParcelData } = validator;

const {
  getParcelOrderById,
  cancelParcelOrder,
  createParcelOrder,
  getAllParcelOrder,
} = OrderController;

