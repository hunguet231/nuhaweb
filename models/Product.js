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
  },
  { timestamps: true }
);

// create product slug from the title
ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = Product = mongoose.model("Product", ProductSchema);
