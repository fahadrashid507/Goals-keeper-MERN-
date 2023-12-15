const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
// the protect middleware does not allow anyone without a token to access this route
router.get("/me", protect, getMe);

module.exports = router;
