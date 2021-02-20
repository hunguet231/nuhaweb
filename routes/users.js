const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const { protect, authorize } = require("../middlewares/auth");

// include other resourse routers
const productsRouter = require("./products");

const router = express.Router();

// re-route into other resource routers
router.use("/:userId/products", productsRouter);

router
  .route("/")
  .get(protect, authorize("admin"), getUsers)
  .post(protect, authorize("admin"), createUser);

router
  .route("/:id")
  .get(getUser)
  .put(protect, authorize("admin"), updateUser)
  .delete(protect, authorize("admin"), deleteUser);

module.exports = router;
