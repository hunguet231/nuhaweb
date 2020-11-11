const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoUpload,
} = require("../controllers/products");

const Product = require("../models/Product");
const advancedResults = require("../middlewares/advancedResults");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middlewares/auth");

router
  .route("/")
  .get(
    advancedResults(Product, { path: "created_by", select: "first_name" }),
    getProducts
  )
  .post(protect, authorize("publisher", "admin"), createProduct);

router
  .route("/:id")
  .get(getProduct)
  .put(protect, authorize("publisher", "admin"), updateProduct)
  .delete(protect, authorize("publisher", "admin"), deleteProduct);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), productPhotoUpload);

module.exports = router;
