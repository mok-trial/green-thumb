const express = require("express");
const router = express.Router();
const Plant = require("../../models/Plant");
const UserPlant = require("../../models/UserPlant");
const User = require("../../models/User");

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

//BELOW THIS LINE HAS NOT BEEN TESTED - VIEL GLÜCK!

router.post("/", (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
    return;
  }

  Plant.create({
    name: req.body.name,
    notes: req.body.notes,
    //to add: watering schedule, plant from database
    owner: req.user._id,
  })
    .then((plant) => {
      console.log(plant);
      res.redirect("/plants");
    })
    .catch((err) => {
      next(err);
    });
});

// deletes the plant
// an admin can delete any plant - a user can only delete can only
// delete it when she is the owner
router.get("/:plantId/", (req, res, next) => {
  const query = { _id: req.params.plantId };

  if (req.user.role !== "admin") {
    query.owner = req.user._id;
  }

  // if user.role !== 'admin'
  // query: { _id: req.params.plantId, owner: req.user._id }
  // else if user.role === 'admin'
  // query; { _id: req.params.plantId }

  Plant.findOneAndDelete(query)
    .then(() => {
      res.redirect("/plants");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
