const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; 

const authMiddlewareV = (req, res, next) => {
  // Get token from headers
  const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
  
  if (!token) {
    console.log('No token found in request headers');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log('Decoded JWT:', decoded); 

    if (!decoded.username) {
      console.log('JWT does not contain username');
      return res.status(401).json({ msg: 'Token is not valid (no username)' });
    }

    req.user = decoded;  
    next(); 
  } catch (err) {
    console.log('JWT verification failed:', err.message);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddlewareV;
