import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// MAKE USER ADMIN
export const makeUserAdmin = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find user by ID
      const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user to admin
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: { isAdmin: true },
      });
  
      res.status(200).json({ message: 'User promoted to admin', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error promoting user' });
    }
  };