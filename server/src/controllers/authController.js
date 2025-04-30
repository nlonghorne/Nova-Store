import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// REGISTER
export const registerUser = async (req, res) => {
  const { email, name, password, isAdmin } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        isAdmin: isAdmin || false,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user exist and password is correct
      const user = await prisma.user.findUnique({ where: { email } });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch || !user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    }
  };