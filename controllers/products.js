const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const path = require("path");

// @desc    Get all products
// @route   GET /api/v1/products
// @route   GET /api/v1/users/:userId/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate({
    path: "user",
    select: [
      "firstName",
      "lastName",
      "phoneNumber",
      "reviews",
      "email",
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
  });

  if (!product) {
    res.status(404);
    throw new Error("Không tìm thấy sản phẩm");
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create new product
// @route   POST /api/v1/users/:userId/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // // Check for published product
  // const publishedProduct = await Product.findOne({ user: req.user.id });

  // if (publishedProduct && req.user.role !== "admin") {
  //   res.status(400).json({message: ""})
  // }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Không tìm thấy sản phẩm với id ${req.params.id}`);
  }

  // make sure user is product owner
  if (product.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401);
    throw new Error("Bạn không có quyền cập nhật sản phẩm này");
  }

  product.title = req.body.title || product.title;
  product.description = req.body.description || product.description;
  product.quantity = req.body.quantity || product.quantity;
  product.prices = req.body.prices || product.prices;
  product.category = req.body.category || product.category;
  product.photos = req.body.photos || product.photos;

  const productEdit = await product.save();

  res.status(200).json({
    success: true,
    data: productEdit,
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Không tìm thấy sản phẩm");
  }

  // make sure user is product owner
  if (product.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401);
    throw new Error("Bạn không có quyền xoá sản phẩm này");
  }

  product.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Create new review
// @route   POST /api/v1/products/:id/reviews
// @access  Private
exports.createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (rv) => rv.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Bạn đã đánh giá cho sản phẩm này trước đó!");
    }

    const review = {
      name: req.user.firstName,
      rating: Number(rating),
      comment,
      user: req.user._id,
      userAvatar: req.user.avatarUser,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.numRatings =
      product.reviews.reduce((acc, rv) => acc + rv.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      message: "Review added",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
