export const isAdmin = async (req, res, next) => {
  try {    
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    if (!user.isAdmin) {
      return res.status(403).json({ error: 'Access denied: Admins only' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};