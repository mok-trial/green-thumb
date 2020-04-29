const express = require("express");
const router = express.Router();
const Plant = require("../../models/Plant");
const UserPlant = require("../../models/UserPlant");
const User = require("../../models/User");
const uploadCloud = require("../../config/cloudinary.js");
const moment = require("moment");

// middleware that checks if a user is logged in
const loginCheck = () => {
  return (req, res, next) => {
    // passport method req.isAuthenticated()
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/auth/login");
    }
  };
};

router.get("/", loginCheck(), (req, res) => {
  const user = req.user;

  Plant.find()
    .then((plants) => {
      const categories = [...new Set(plants.map((plant) => plant.category))];
      res.render("addPlant/addPlantFromDB", { plants, user, categories });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", loginCheck(), (req, res) => {
  const user = req.user;
  const today = moment().format("YYYY-MM-DD");
  const startOfThisYear = moment().format("YYYY-01-01");

  Plant.findById(req.params.id)
    .then((plant) => {
      const userPlant = UserPlant.schema.obj.waterSchedule.enum;
      const plantId = req.params.id;
      res.render("addPlant/confirmPlantFromDB", {
        plant,
        user,
        userPlant,
        plantId,
        today,
        startOfThisYear,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post(
  "/:plantId",
  uploadCloud.single("photo"),
  loginCheck(),
  (req, res) => {
    const { customName, waterSchedule, lastWater, notes } = req.body;
    const plantInfo = req.params.plantId;

    const defaultUserImage =
      "https://res.cloudinary.com/rootdirectory/image/upload/v1588166094/user-plants/rootdir-assets/default-plant.png";
    let imgPath = req.file ? req.file.url : defaultUserImage;
    let imgName = req.file ? req.file.originalname : "default-image";

    const userId = req.user._id;

    UserPlant.create({
      customName,
      waterSchedule,
      notes,
      plantInfo,
      imgName,
      imgPath,
      lastWater,
    })

      .then((userPlant) => {
        console.log("plant added");
        User.updateOne(
          { _id: userId },
          { $push: { plantCollection: userPlant } }
        ).catch((error) => {
          console.log(error);
        });
      })

      .then((data) => {
        console.log(`Success ${data} was added to the database`);

        res.redirect("/profile");
      })
      .catch((err) => res.render("addPlant/addPlantFromDB"));
  }
);

//BELOW THIS LINE HAS NOT BEEN TESTED - VIEL GLÜCK!

// router.post("/", (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     res.redirect("/");
//     return;
//   }

//   Plant.create({
//     name: req.body.name,
//     notes: req.body.notes,
//     //to add: watering schedule, plant from database
//     owner: req.user._id,
//   })
//     .then((plant) => {
//       console.log(plant);
//       res.redirect("/plants");
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// // deletes the plant
// // an admin can delete any plant - a user can only delete can only
// // delete it when she is the owner
// router.get("/:plantId/", (req, res, next) => {
//   const query = { _id: req.params.plantId };

//   if (req.user.role !== "admin") {
//     query.owner = req.user._id;
//   }

//   // if user.role !== 'admin'
//   // query: { _id: req.params.plantId, owner: req.user._id }
//   // else if user.role === 'admin'
//   // query; { _id: req.params.plantId }

//   Plant.findOneAndDelete(query)
//     .then(() => {
//       res.redirect("/plants");
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

module.exports = router;
