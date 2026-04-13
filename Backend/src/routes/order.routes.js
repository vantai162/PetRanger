import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import {
  createOrder,
  getOrdersByCustomer,
  getOrderById,
} from '../controllers/order.controller.js';

const router = Router();

router.post('/create', verifyToken, createOrder);
router.get('/customer/:customerId', verifyToken, getOrdersByCustomer);
router.get('/:id', verifyToken, getOrderById);

export default router;