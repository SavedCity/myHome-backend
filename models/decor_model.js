const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const decorSchema = new Schema(
  {
    culture: String,
    room: String,
    image: String,
    image2: String,
    name: String,
    color: String,
    style: String,
    dimensions: String,
    material: String,
  },
  {
    timestamps: true,
  }
);

const Decor = mongoose.model("Decor", decorSchema);

module.exports = Decor;
