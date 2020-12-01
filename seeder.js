const mongoose = require("mongoose");
const fs = require("fs");
require("colors");
// load models
const Product = require("./models/Product");
const User = require("./models/User");

// connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// read data file
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

// import to DB
const importData = async () => {
  try {
    await Product.create(products);
    await User.create(users);

    console.log("Data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// destroy data
const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] == "-i") {
  importData();
}

if (process.argv[2] == "-d") {
  deleteData();
}
