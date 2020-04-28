const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userPlantSchema = new Schema({
  name: String,
  notes: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const UserPlant = mongoose.model("UserPlant", userPlantSchema);

module.exports = UserPlant;
