const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userPlantSchema = new Schema({
  customName: String,
  plantInfo: {
    type: Schema.Types.ObjectId,
    ref: "Plant"
  },
  notes: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  waterSchedule: {
    type: String,
    enum: [
      "Daily",
      "Every other day",
      "Twice a week",
      "Semiweekly",
      "Weekly",
      "Biweekly",
    ]
  },
  lastWater: String,

});

const UserPlant = mongoose.model("UserPlant", userPlantSchema);

module.exports = UserPlant;
