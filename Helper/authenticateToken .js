const jwt = require("jsonwebtoken");

// Middleware function to verify JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    // Attach the user data to the request for use in route handlers
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
