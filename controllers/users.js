const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  // let query;

  // const reqQuery = { ...req.query };

  // // fields to exclude
  // const removeFields = ["select", "sort", "page", "limit"];

  // // loop over and delete them from reqQuery
  // removeFields.forEach((param) => delete reqQuery[param]);

  // // create query string
  // let queryStr = JSON.stringify(reqQuery);

  // // create operators ($gt, $gte, $lt, $lte)
  // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

  // // finding resource
  // query = User.find(JSON.parse(queryStr)).populate("products");

  // // select fields
  // if (req.query.select) {
  //   const fields = req.query.select.split(",").join(" ");
  //   query = query.select(fields);
  // }

  // // sort
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ");
  //   query = query.sort(sortBy);
  // } else {
  //   query = query.sort("-created_at");
  // }

  // // pagination
  // const page = parseInt(req.query.page, 10) || 1;
  // const limit = parseInt(req.query.limit, 10) || 10;
  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;
  // const total = await User.countDocuments();

  // query = query.skip(startIndex).limit(limit);

  // // executing query
  // const users = await query;

  // // pagination result
  // const pagination = {};

  // if (endIndex < total) {
  //   pagination.next = {
  //     page: page + 1,
  //     limit,
  //   };
  // }

  // if (startIndex > 0) {
  //   pagination.prev = {
  //     page: page - 1,
  //     limit,
  //   };
  // }

  const users = await User.find({});

  res.status(200).json({
    success: true,
    count: users.length,
    // pagination,
    data: users,
  });
});

// @desc    Get single user by ID
// @route   GET /api/v1/users/:id
// @access  Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Create new user
// @route   POST /api/v1/users
// @access  Private
exports.createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return new ErrorResponse(`User not found with id of ${req.params.id}`, 404);
  }

  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.username = req.body.username || user.username;
  user.shopName = req.body.shopName || user.shopName;
  user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return new ErrorResponse(`User not found with id of ${req.params.id}`, 404);
  }

  await user.remove();

  res.status(200).json({
    success: true,
    data: user,
  });
});
