const mongoose = require("mongoose");
const slugify = require("slugify");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
    userAvatar: { type: String, required: true },
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
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.mongo.ObjectId(),
    },
    title: {
      type: String,
      required: true,
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
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    prices: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    numRatings: {
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
  this.slug = slugify(this.title, { lower: true }) + "." + this._id;
  next();
});

module.exports = Product = mongoose.model("Product", ProductSchema);
