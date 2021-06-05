const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://home-decor-frontend.herokuapp.com",
    ],
    credentials: true,
  })
);
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));

const decorController = require("./controllers/decor_controller.js");
app.use("/home", decorController);
const userController = require("./controllers/user_controller.js");
app.use("/user", userController);

const uri = process.env.MDB_CONNECT;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully!");
// });

app.listen(PORT, () => {
  console.log("server is running boi 🏠, port " + PORT);
});
