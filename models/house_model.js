const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const houseSchema = new Schema(
  {
    price: { type: Number, maxLength: 12, minLength: 4 },
    active: String,
    image: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    bd: { type: Number, maxLength: 2, minLength: 1 },
    ba: { type: Number, maxLength: 2, minLength: 1 },
    sqft: { type: Number, maxLength: 5, minLength: 3 },
    location: { type: String, maxLength: 2, minLength: 2 },
    address: { type: String, maxLength: 25, minLength: 9 },
    city: { type: String, maxLength: 15, minLength: 3 },
    zipcode: { type: Number, maxLength: 5, minLength: 5 },
    yb: { type: Number, maxLength: 4, minLength: 4 },
    listedBy: String,
  },
  {
    timestamps: true,
  }
);

const House = mongoose.model("House", houseSchema);

module.exports = House;
