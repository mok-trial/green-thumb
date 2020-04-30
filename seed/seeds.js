const mongoose = require("mongoose");
const Plant = require("../models/Plant");
const plants = require("./plants.json");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/root-directory", {
  useNewUrlParser: true,
});

Plant.insertMany(plants)
  .then((data) => {
    console.log("Success");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
