const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error");
require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");

// connect to DB
connectDB();

const app = express();

// body parse middleware
app.use(express.json());

// cookie parser middleware
app.use(cookieParser());

// file uploading
app.use(fileupload());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// mount routes
app.use("/api/v1/products", require("./routes/products"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/auth", require("./routes/auth"));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow);
});
