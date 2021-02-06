const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/products");

const Product = require("../models/Product");
const advancedResults = require("../middlewares/advancedResults");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middlewares/auth");

router
  .route("/")
  .get(
    advancedResults(Product, {
      path: "user",
      select: [
        "firstName",
        "lastName",
        "phoneNumber",
        "reviews",
        "username",
        "address",
        "shopName",
        "numReviews",
        "avgStars",
        "avatarShop",
        "avatarUser",
        "website",
        "city",
        "zalo",
        "facebook",
      ],
    }),
    getProducts
  )
  .post(protect, authorize("publisher", "admin"), createProduct);

router
  .route("/:id")
  .get(getProduct)
  .put(protect, authorize("publisher", "admin"), updateProduct)
  .delete(protect, authorize("publisher", "admin"), deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);
module.exports = router;
