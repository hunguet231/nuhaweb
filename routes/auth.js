const express = require("express");
const {
  register,
  login,
  googleLogin,
  getMe,
  updateShop,
  forgotPassword,
  updateUserProfile,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/googleLogin", googleLogin);

router.route("/profile").put(protect, updateUserProfile);

router.put("/update-shop", protect, updateShop);

router.post("/forgotpassword", forgotPassword);

module.exports = router;
