export const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log for yourself
    res.status(500).json({ error: 'Something went wrong!' });
  };  