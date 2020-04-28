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
});
const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
