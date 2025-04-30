import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create Order
export const createOrder = async (req, res) => {
    try {
      const userId = req.user.id;
      const { orderItems } = req.body;
  
      // Basic validation
      if (!Array.isArray(orderItems) || orderItems.length === 0) {
        return res.status(400).json({ error: 'No order items provided' });
      }
  
      // 1. Pull all product IDs from the request
      const productIds = orderItems.map(item => item.productId);
  
      // 2. Fetch those products from the DB
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, price: true }
      });
  
      // 3. Build a map for quick price lookup
      const priceMap = products.reduce((map, p) => {
        map[p.id] = p.price;
        return map;
      }, {});
  
      // 4. Calculate total
      let totalPrice = 0;
      for (let item of orderItems) {
        const unitPrice = priceMap[item.productId];
        if (unitPrice == null) {
          return res.status(400).json({ error: `Product ${item.productId} not found` });
        }
        totalPrice += unitPrice * item.quantity;
      }
  
      // 5. Create the order with computed totalPrice
      const newOrder = await prisma.order.create({
        data: {
          userId,
          totalPrice,
          orderItems: {
            create: orderItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
            }))
          }
        },
        include: { orderItems: true }
      });
      res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
      console.error('Create order error:', error); 
      res.status(500).json({ error: 'Failed to place order' });
    }
  };

// Get all orders for a user
export const getOrdersByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await prisma.order.findMany({
          where: { userId: parseInt(userId) },
          include: {
                 orderItems: {
                   include: {
                     product: true,
                   },
                 },
               },
        });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user orders' });
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await prisma.order.findUnique({
          where: { id: parseInt(orderId) },
          include: {
                 orderItems: {
                   include: {
                     product: true,
                   },
                 },
               },
        });
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch order' });
    }
};