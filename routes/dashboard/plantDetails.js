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

router.get("/:id", loginCheck(), (req, res) => {
  const user = req.user;
  const id = req.params.id;
  UserPlant.findById(id)
    .populate("plantInfo")
    .then((plant) => {
      res.render("dashboard/plantdetail", { user, plant });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
