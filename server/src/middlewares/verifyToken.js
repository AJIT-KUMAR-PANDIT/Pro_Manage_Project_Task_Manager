const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  let token = req.header('Authorization');

console.log("token===",token)


  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is required.' });
  }else{
    token=token.split(' ')[1];
    console.log("token+++",token)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
