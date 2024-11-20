// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//         return res.status(401).json({ message: 'Access Denied: No token provided' });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach user info to the request object
//         next(); // Proceed to the next middleware or route handler
//     } catch (err) {
//         return res.status(403).json({ message: 'Invalid or expired token' });
//     }
// };

// module.exports = authenticateToken;
