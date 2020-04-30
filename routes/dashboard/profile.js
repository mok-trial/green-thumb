const express = require("express");
const router = express.Router();
const Plant = require('../../models/Plant');
const UserPlant = require('../../models/UserPlant');
const User = require('../../models/User');

// middleware that checks if a user is logged in
const loginCheck = () => {
  return (req, res, next) => {
    // passport method req.isAuthenticated()
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  };
};


router.get('/', loginCheck(), (req, res) => {
    const user = req.user
    const allPlants = req.user.plantCollection
    const allPlantsPromise = allPlants.map(idOfUserPlant => {
      return Promise.resolve(UserPlant.findById(idOfUserPlant))
    })
    Promise.all(allPlantsPromise).then(userplants => {
      res.render("dashboard/profile", { user: user, userplants })
    })
  
    // // get waterSchedule and lastWater and calculate nextWater 
    // function mapwaterScheduleToNumOfDays(waterSchedule) {
    //   const objectForwaterSchedule = {
    //     'Daily': 1,
    //     'Every other day': 2,
    //     'Twice a week': 3,
    //     'Weekly': 7,
    //     'Biweekly': 14,
    //     'Monthly': 30,
    //   }
    //   return objectForwaterSchedule[waterSchedule]
    // }
    
    // const numberOfDaysForWateringRoutine = mapwaterScheduleToNumOfDays("Weekly")
    // const lastWater = "YYYY-MM-DD"
    // const nextWater = lastWater.add(numberOfDaysForWateringRoutine, 'days')

  });


  module.exports = router;