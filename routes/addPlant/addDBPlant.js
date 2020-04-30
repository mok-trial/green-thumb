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
      const uniqueCategories = [
        ...new Set(plants.map((plant) => plant.category)),
      ];
      const categories = uniqueCategories.map((category) => ({
        name: category,
        image: plants.filter((plant) => plant.category === category)[0].image,
      }));
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
    const userId = req.user._id;
    const { customName, waterSchedule, lastWater, notes } = req.body;
    const plantInfo = req.params.plantId;

    //Added by Karl (start)

    const user = req.user;
    const today = moment().format("YYYY-MM-DD");
    const startOfThisYear = moment().format("YYYY-01-01");

    if (customName === "") {
      res.render("addPlant/confirmPlantFromDB", {
        plant,
        user,
        userPlant,
        plantId,
        today,
        startOfThisYear,
        message: "Custom name cannot be empty",
      });

      return;
    }

    //Added by Karl (end)

    Plant.findById(req.params.plantId)
      .then((plant) => {
        console.log(plant.image);

        let imgPath = req.file ? req.file.url : plant.image;
        let imgName = req.file ? req.file.originalname : "database-image";

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
            return userPlant;
          })

          .then((data) => {
            console.log(`Success ${data} was added to the database`);

            res.redirect("/profile");
          })
          .catch((err) => res.render("addPlant/addPlantFromDB"));
      })
      .catch((err) => console.log(err));
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
