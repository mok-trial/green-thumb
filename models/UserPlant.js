const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userPlantSchema = new Schema({
  customName: String,
  plantInfo: {
    type: Schema.Types.ObjectId,
    ref: "Plant"
  },
 /*  notes: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }, */   //Fairly certain not needed (not used on w5d2 lecture material - KS)
  waterSchedule: {
    type: String,
    enum: [
      "Daily",
      "Every other day",
      "Twice a week",
      "Semiweekly",
      "Weekly",
      "Biweekly",
      "Monthly"
    ]
  },
  lastWater: String,

  imgName: String, //Name on cloudinary

  imgPath: String  //Links to cloudinary

});

const UserPlant = mongoose.model("UserPlant", userPlantSchema);

module.exports = UserPlant;
