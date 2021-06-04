const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const decorController = require("./controllers/decor_controller.js");
app.use("/home", decorController);
const userController = require("./controllers/user_controller.js");
app.use("/user", userController);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

app.listen(port, () => {
  console.log("server is running boi 🏠, port " + port);
});
