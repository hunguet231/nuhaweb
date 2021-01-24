const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middlewares/error");
const { AwakeHeroku } = require("awake-heroku");
require("colors");

AwakeHeroku.add("https://nuhaweb.herokuapp.com");
AwakeHeroku.add("http://nuhaweb.herokuapp.com");
AwakeHeroku.start();

dotenv.config();

// connect to DB
connectDB();

const app = express();

// body parse middleware
app.use(express.json());
app.use(cors());

// cookie parser middleware
app.use(cookieParser());

// mount routes
app.use("/api/v1/products", require("./routes/products"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/auth", require("./routes/auth"));

var __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  );
});
