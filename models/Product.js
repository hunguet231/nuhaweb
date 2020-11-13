const mongoose = require("mongoose");
const slugify = require("slugify");

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

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [200, "Name cannot be more than 200 characters"],
  },
  slug: {
    type: String,
  },
  photo: {
    type: String,
    default: "https://loremflickr.com/200/200/cat",
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
    type: Number,
    default: 0,
  },
  prices: {
    type: String,
    required: [true, "Price is required"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  avg_stars: {
    type: Number,
    default: 0,
  },
  num_reviews: {
    type: Number,
    default: 0,
  },
});

// create product slug from the title
ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = Product = mongoose.model("Product", ProductSchema);
