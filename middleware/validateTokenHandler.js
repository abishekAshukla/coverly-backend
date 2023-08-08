const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// followign function ior middleware gets token from request header and validates it and passes decoded information as a request
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("User is not authorized here");
  }
});

module.exports = validateToken;
