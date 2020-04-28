const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  commonName: String,
  scientificName: String,
  image: String,
  light: String,
  watering: String,
  soil: String,
  propagation: String,
  humidity: String,
  category: {
    type: String,
    enum: [
      "Flowering House Plants",
      "Foliage Type Plants",
      "Succulents and Cacti",
      "Fern Type Plants",
      "Trailing & Climbing Plants",
    ],
  },
});
const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
