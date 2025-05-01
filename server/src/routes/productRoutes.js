import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validateProduct } from '../middleware/validateRequest.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/create',validateProduct, authMiddleware, isAdmin, createProduct);
router.put('/update/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/delete/:id', authMiddleware, isAdmin, deleteProduct);

export default router;