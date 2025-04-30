import express from 'express';
import { PrismaClient } from '@prisma/client';
import { makeUserAdmin } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const prisma = new PrismaClient();
const router = express.Router();

router.put('/make-admin/:userId', authMiddleware, isAdmin, makeUserAdmin);

export default router;
