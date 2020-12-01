const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, shopName, city, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email này đã tồn tại");
  }

  // create user
  const user = await User.create({
    firstName,
    lastName,
    shopName,
    city,
    email,
    password,
  });

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate username and password
  if (!email || !password) {
    res.status(400);
    throw new Error("Hãy điền vào email và mật khẩu");
  }

  // check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("Tài khoản không tồn tại");
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new Error("Mật khẩu không đúng");
  }

  sendTokenResponse(user, 200, res);
});

// get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update shop
// @route   PUT /api/v1/auth/update-shop
// @access  Private
exports.updateShop = asyncHandler(async (req, res, next) => {
  const shopNameExists = await User.findOne({ shopName: req.body.shopName });

  if (shopNameExists) {
    res.status(400);
    throw new Error("Tên shop đã tồn tại");
  }

  const user = await User.findById(req.user._id);

  if (user) {
    user.shopName = req.body.shopName || user.shopName;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.address = req.body.address || user.address;
    user.website = req.body.website || user.website;
    user.zalo = req.body.zalo || user.zalo;
    user.facebook = req.body.facebook || user.facebook;
    user.isSeller = true;

    const updateShop = await user.save();

    const {
      shopName,
      phoneNumber,
      address,
      website,
      zalo,
      facebook,
      isSeller,
    } = updateShop;

    res.json({
      success: true,
      data: {
        shopName,
        phoneNumber,
        address,
        website,
        zalo,
        facebook,
        isSeller,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: user,
  });
});
