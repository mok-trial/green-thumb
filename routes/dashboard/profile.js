const express = require("express");
const router = express.Router();
const UserPlant = require("../../models/UserPlant");
const moment = require("moment")

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


router.get('/', loginCheck(), (req, res) => {
    const user = req.user
    // get waterSchedule and lastWater and calculate nextWater 
    function mapwaterScheduleToNumOfDays(waterSchedule) {
      const objectForwaterSchedule = {
        'Daily': 1,
        'Every other day': 2,
        'Twice a week': 3,
        'Weekly': 7,
        'Biweekly': 14,
        'Monthly': 30,
      }
      return objectForwaterSchedule[waterSchedule]
    }
    const today = moment().format('YYYY-MM-DD')
    const allPlants = req.user.plantCollection
    const allPlantsPromise = allPlants.map(idOfUserPlant => {
      return Promise.resolve(UserPlant.findById(idOfUserPlant))
    })
    Promise.all(allPlantsPromise).then(userplants => {
      userplants.map(userplant => {
        const numberOfDaysForWateringRoutine = mapwaterScheduleToNumOfDays(userplant.waterSchedule)
        const nextWater = moment(userplant.lastWater).add(numberOfDaysForWateringRoutine, 'days').format('YYYY-MM-DD')
        return nextWater
      })
      res.render("dashboard/profile", { user: user, userplants })
    })
  });  

module.exports = router;
