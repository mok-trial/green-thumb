const express = require("express");
const router = express.Router();
const Plant = require("../models/Plant");
const UserPlant = require("../models/UserPlant");

router.get("/add", (req, res) => {
  res.render("plants/add");
});

router.get("/", (req, res, next) => {
  Plant.find()
    .then((plants) => {
      res.render("plants/index", { plantsList: plants });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
    return;
  }

  Plant.create({
    price: req.body.price,
    name: req.body.name,
    description: req.body.description,
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
