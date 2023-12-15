const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from req header

      /**
       * token format : "Bearer djcnjhheuhvbcehgygeudhwijiw"
       * so we want to split at space and store in an array then use just the 2nd half
       */

      token = req.headers.authorization.split(" ")[1];

      //Verify the token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get the user from the token minus the hashed password

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No token. Not authorized");
  }
});

module.exports = {
  protect,
};
