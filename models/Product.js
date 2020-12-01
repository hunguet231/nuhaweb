const mongoose = require("mongoose");
const slugify = require("slugify");
const short = require("short-uuid");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a name"],
    },
    slug: {
      type: String,
    },
    photos: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      default: "0",
    },
    prices: {
      type: String,
      required: [true, "Price is required"],
    },
    reviews: [reviewSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    avgStars: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    loves: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// create product slug from the title
ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true }) + "." + short.generate();
  next();
});

module.exports = Product = mongoose.model("Product", ProductSchema);
