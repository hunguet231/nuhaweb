const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { protect } = require("../middlewares/auth");

// include other resourse routers
const productsRouter = require("./products");

const router = express.Router();

// re-route into other resource routers
router.use("/:userId/products", productsRouter);

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
