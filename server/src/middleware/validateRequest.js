export const validateProduct = (req, res, next) => {
    const { name, description, price } = req.body;
    
    if (!name || !description || typeof price !== 'number') {
      return res.status(400).json({ error: 'Invalid product data' });
    }
    
    next();
  };
  
export const validateOrder = (req, res, next) => {
  const { orderItems } = req.body;

  if (!Array.isArray(orderItems)) {
    return res.status(400).json({ error: 'Invalid order data' });
  }
  next();
};