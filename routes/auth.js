const express = require("express");
const {
  register,
  login,
  getMe,
  updateShop,
  forgotPassword,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/update-shop", protect, updateShop);
router.post("/forgotpassword", forgotPassword);

module.exports = router;
