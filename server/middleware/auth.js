const jwt = require('jsonwebtoken');

function protect(req, res, next) {
  // 1. Get the token from the Authorization header
  const authHeader = req.header('Authorization');

  // Check for token and if it's a Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const token = authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach the user's ID to the request object
    req.userId = decoded.user.id;
    
    // 4. Pass control to the next middleware
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = protect;