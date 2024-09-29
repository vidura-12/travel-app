// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.TOKEN, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.sendStatus(403); // Forbidden
        }
        console.log('Token verified, user:', user);
        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken; // Export directly
