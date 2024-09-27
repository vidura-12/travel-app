const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    // Access Authorization header correctly
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // Use the token directly if not using Bearer scheme
        const token = authHeader;

        // Verify token
        jwt.verify(token, process.env.TOKEN, (err, user) => {
            if (err) {
                console.error('Token verification failed:', err);
                return res.sendStatus(403); // Forbidden
            }

            // Attach user to request object if needed
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};
