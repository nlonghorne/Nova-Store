import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all products
export const getAllProducts = async (req, res) => {
    try {
      const products = await prisma.product.findMany();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Get single product by ID
export const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// Create a new product (admin only)
export const createProduct = async (req, res) => {
    try {
      const { name, description, price, imageUrl, quantity } = req.body;
      const newProduct = await prisma.product.create({
          data: { name, description, price, imageUrl, quantity },
        });
        res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product' });
    }
};

// Update Product (admin only)
export const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, description } = req.body;
      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: { name, description, price },
      });
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete Product (admin only)
export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.product.delete({
          where: { id: parseInt(id) },
        });
        res.json({ message: `Product with id ${id} deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
};