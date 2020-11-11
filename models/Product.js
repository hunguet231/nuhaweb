const mongoose = require("mongoose");
const slugify = require("slugify");

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
    enum: ["Man", "Woman"],
  },
  quantity: {
    type: Number,
    default: 0,
  },
  prices: {
    type: String,
    required: [true, "Price is required"],
  },
  prices_discount: {
    type: Number,
    default: 0,
  },
  is_paid: {
    type: Boolean,
    default: false,
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
  num_ratings: {
    type: Number,
    default: 0,
  },
  avg_ratings: {
    type: Number,
  },
  detail: {
    type: String,
  },
});

// create product slug from the title
ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = Product = mongoose.model("Product", ProductSchema);
