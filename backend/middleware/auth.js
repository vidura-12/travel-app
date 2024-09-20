const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  
  const authHeader = req.headers.authorization;

  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    
    const token = authHeader.split(' ')[1];

    
    jwt.verify(token, process.env.TOKEN, (err, user) => {
      if (err) {
        console.error('Token verification failed:', err);
        return res.status(403).json({ message: 'Forbidden: Invalid token' }); 
      }

     
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized: No token provided' }); 
  }
};
