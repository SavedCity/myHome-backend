const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/user_model.js");

sessions.post("/", (req, res) => {
  User.findOne(
    {
      username: req.body.username,
    },
    (err, foundUser) => {
      if (err) {
        console.log(err);
        res.send("database error");
      } else if (!foundUser) {
        res.send("no user found");
      } else {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.currentUser = foundUser;
          res.json(req.session.currentUser);
        } else {
          res.send("password does not match");
        }
      }
    }
  );
});

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = sessions;
