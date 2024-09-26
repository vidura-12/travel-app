<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; 

const authMiddleware = (req, res, next) => {
  // Get token from headers
  const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
  
  if (!token) {
    console.log('No token found in request headers');
=======

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader);  

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];  
  console.log('Extracted Token:', token); 

  if (!token) {
>>>>>>> Final
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
<<<<<<< HEAD
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

module.exports = authMiddleware;
=======
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);  
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
>>>>>>> Final
