const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "45790515442-clqjotokdi4k0frcbnoi36kpvqj6476v.apps.googleusercontent.com"
);

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, avatarUser } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email này đã tồn tại");
  }

  // create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    avatarUser,
  });

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

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

// @desc    Login Google
// @route   POST /api/v1/auth/googleLogin
// @access  Public
exports.googleLogin = (req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "45790515442-clqjotokdi4k0frcbnoi36kpvqj6476v.apps.googleusercontent.com",
    })
    .then((response) => {
      const {
        email_verified,
        email,
        family_name,
        given_name,
        picture,
      } = response.payload;

      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ error: "Something went wrong..." });
          } else {
            if (user) {
              sendTokenResponse(user, 200, res);
            } else {
              const password = email + process.env.JWT_SECRET;
              const newUser = new User({
                firstName: given_name,
                lastName: family_name,
                avatarUser: picture,
                shopName: email,
                email,
                password,
              });
              newUser.save((err, data) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(400)
                    .json({ error: "Something went wrong..." });
                }

                sendTokenResponse(newUser, 200, res);
              });
            }
          }
        });
      }
    });
};

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

  // const { _id, email, firstName, lastName } = user;

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};

// @desc    Update user profile
// @route   PUT /api/v1/auth/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await User.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update shop
// @route   PUT /api/v1/auth/update-shop
// @access  Private
exports.updateShop = asyncHandler(async (req, res) => {
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
    user.city = req.body.city || user.city;
    user.zalo = req.body.zalo || user.zalo;
    user.facebook = req.body.facebook || user.facebook;
    user.isSeller = true;

    const updateShop = await user.save();

    const {
      shopName,
      phoneNumber,
      address,
      website,
      city,
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
        city,
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
