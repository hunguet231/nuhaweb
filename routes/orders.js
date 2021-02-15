const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} = require("../controllers/orders");
const { protect } = require("../middlewares/auth");

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").post(protect, updateOrderToPaid);

module.exports = router;
