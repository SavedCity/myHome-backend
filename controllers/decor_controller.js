const express = require("express");
const home = express.Router();
const Decor = require("../models/decor_model.js");

home.get("/", (req, res) => {
  Decor.find({}, (err, foundDecor) => {
    res.json(foundDecor);
  });
});

home.post("/", (req, res) => {
  Decor.create(req.body, (err, createdDecor) => {
    Decor.find({}, (err, foundDecor) => {
      res.json(foundDecor);
    });
  });
});

home.get("/:id", (req, res) => {
  Decor.findById(req.params.id, (err, foundDecor) => {
    res.json(foundDecor);
  });
});

home.put("/:id", (req, res) => {
  Decor.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedDecor) => {
      if (err) {
        res.send(err);
      } else {
        Decor.find({}, (err, foundDecor) => {
          res.json(foundDecor);
        });
      }
    }
  );
});

home.delete("/:id", (req, res) => {
  Decor.findByIdAndDelete(req.params.id, (err, deletedDecor) => {
    Decor.find({}, (err, foundDecor) => {
      res.json(foundDecor);
    });
  });
});

module.exports = home;
