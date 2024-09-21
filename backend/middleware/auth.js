const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'dfgdfgdfgdfgdgfgsdfgdfgsg'; 

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); 
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; 
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' }); 
    }
    next();
  } catch (err) {
    console.error('Token verification error:', err); 
    res.status(400).json({ msg: 'Token is not valid' });
  }
};
