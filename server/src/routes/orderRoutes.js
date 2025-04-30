import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validateOrder } from '../middleware/validateRequest.js';
import { createOrder, getOrdersByUserId, getOrderById } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', authMiddleware, validateOrder, createOrder);
router.get('/user/:userId', authMiddleware, getOrdersByUserId);
router.get('/:orderId', authMiddleware, getOrderById);

export default router;