const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  // Get token from headers
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.replace('Bearer ', '');

  if (!token) {
    console.log('No token found in request headers');
    return res.status(401).json({ msg: 'Authorization denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secret);
    console.log('Decoded JWT:', decoded);  // Log the decoded token for debugging

    // Ensure the token contains the required fields, like email
    if (!decoded.email) {
      console.log('JWT does not contain an email');
      return res.status(401).json({ msg: 'Invalid token: Email missing in token payload' });
    }

    // Attach user information from the token to the request object
    req.user = { email: decoded.email };  // Attach user object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    console.log('JWT verification failed:', err.message);
    return res.status(401).json({ msg: 'Token verification failed: Invalid token' });
  }
};

module.exports = authMiddleware;