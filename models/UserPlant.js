const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userPlantSchema = new Schema({
  customName: String,
  plantInfo: {
    type: Schema.Types.ObjectId,
    ref: "Plant"
  },
  notes: String,

  waterSchedule: {
    type: String,
    enum: [
      "Daily",
      "Every other day",
      "Twice a week",
      "Weekly",
      "Biweekly",
      "Monthly"
    ]
  },

  lastWater: String,

  imgName: String, //Name on cloudinary

  imgPath: {
    type: String,  //Links to cloudinary
    default: "https://res.cloudinary.com/rootdirectory/image/upload/v1588166094/user-plants/rootdir-assets/icons8-plant-96_xbgilv.png"
  }
  });


const UserPlant = mongoose.model("UserPlant", userPlantSchema);

module.exports = UserPlant;
