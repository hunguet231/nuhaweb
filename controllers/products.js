const Product = require("../models/Product");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const config = require("config");
const path = require("path");

// @desc    Get all products
// @route   GET /api/v1/products
// @route   GET /api/v1/users/:userId/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({
    path: "created_by",
    select: "first_name",
  });

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create new product
// @route   POST /api/v1/users/:userId/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.created_by = req.user.id;

  // Check for published product
  const publishedProduct = await Product.findOne({ created_by: req.user.id });

  if (publishedProduct && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already published a product`,
        400
      )
    );
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  // make sure user is product owner
  if (
    product.created_by.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this product`,
        401
      )
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return new ErrorResponse(
      `Product not found with id of ${req.params.id}`,
      404
    );
  }

  // make sure user is product owner
  if (
    product.created_by.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this product`,
        401
      )
    );
  }

  product.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Upload photo for product
// @route   PUT /api/v1/products/:id/photo
// @access  Private
exports.productPhotoUpload = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return new ErrorResponse(
      `Product not found with id of ${req.params.id}`,
      404
    );
  }

  // make sure user is product owner
  if (
    product.created_by.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this product`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // check isImage
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // check file size
  if (file.size > config.get("MAX_FILE_UPLOAD")) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${config.get("MAX_FILE_UPLOAD")}`,
        400
      )
    );
  }

  // create custom filename
  file.name = `photo_${product._id}${path.parse(file.name).ext}`;

  file.mv(`${config.get("FILE_UPLOAD_PATH")}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);

      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Product.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
