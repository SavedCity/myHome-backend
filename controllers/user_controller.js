const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const users = express.Router();
const User = require("../models/user_model.js");

// REGISTER
users.post("/", async (req, res) => {
  try {
    const { username, password, passwordVerify } = req.body;

    // validation

    if (!username || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });
    }

    if (password.length < 4) {
      return res.status(400).json({
        errorMessage: "Please enter password of at least 4 characters",
      });
    }

    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: "Password does not match",
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: "An account with this username already exists",
      });
    }

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //save a new user account to the db

    const newUser = new User({
      username,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // sign the token

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();

    console.log(token);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

users.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // validate

    if (!username || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });
    }

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ errorMessage: "Wrong username" });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Wrong password" });
    }

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

// log out

users.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});
module.exports = users;
