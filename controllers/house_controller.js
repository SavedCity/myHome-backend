const express = require("express");
const home = express.Router();
const House = require("../models/house_model.js");

home.get("/", (req, res) => {
  House.find({}, (err, foundHouse) => {
    res.json(foundHouse);
  });
});

home.post("/", (req, res) => {
  House.create(req.body, (err, createdHouse) => {
    House.find({}, (err, foundHouse) => {
      res.json(foundHouse);
    });
  });
});

home.get("/:id", (req, res) => {
  House.findById(req.params.id, (err, foundHouse) => {
    res.json(foundHouse);
  });
});

home.put("/:id", (req, res) => {
  House.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedHouse) => {
      if (err) {
        res.send(err);
      } else {
        House.find({}, (err, foundHouse) => {
          res.json(foundHouse);
        });
      }
    }
  );
});

home.delete("/:id", (req, res) => {
  House.findByIdAndDelete(req.params.id, (err, deletedHouse) => {
    House.find({}, (err, foundHouse) => {
      res.json(foundHouse);
    });
  });
});

module.exports = home;
