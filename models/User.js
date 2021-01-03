const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    shopName: {
      type: String,
      unique: true,
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
      default: "publisher",
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Mật khẩu phải ít nhất 6 ký tự"],
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    profile: {
      type: String,
    },
    avatarUser: {
      type: String,
    },
    avatarShop: {
      type: String,
    },
    shopLevel: {
      type: String,
      default: "Hạng thường",
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zalo: {
      type: String,
    },
    facebook: {
      type: String,
    },
    avgStars: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    website: {
      type: String,
    },
    wishlist: {
      type: Array,
      default: [],
    },
    saveList: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

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
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
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

// Cascade delete courses when a bootcamp is deleted
UserSchema.pre("remove", async function (next) {
  await this.model("Product").deleteMany({ user: this._id });
  next();
});

// Reverse populate with virtuals
UserSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

module.exports = mongoose.model("User", UserSchema);
