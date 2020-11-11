const crypto = require("crypto");
const mongoose = require("mongoose");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Please add a username"],
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email",
    ],
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "wholesaler"],
    default: "customer",
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  profile: {
    type: String,
  },
  avatar: {
    type: String,
    default: "default_avt.png",
  },
  company_name: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
  avg_stars: {
    type: Number,
    default: 0,
  },
  num_reviews: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
  },
  website: {
    type: String,
  },
  cart: {
    type: Array,
    default: [],
  },
  wishlist: {
    type: Array,
    default: [],
  },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, config.get("JWT_SECRET"), {
    expiresIn: config.get("JWT_EXPIRE"),
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
