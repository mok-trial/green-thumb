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

router.get('/', loginCheck(), (req, res) => {
  const user = req.user
  const allPlants = req.user.plantCollection
  const allPlantsPromise = allPlants.map(idOfUserPlant => {
    return Promise.resolve(UserPlant.findById(idOfUserPlant))
  })
  Promise.all(allPlantsPromise).then(allUserplants => {
    const userplants = allUserplants.map(userplant => {
      const numberOfDaysForWateringRoutine = mapwaterScheduleToNumOfDays(userplant.waterSchedule)
      const nextWaterDate = moment(userplant.lastWater).add(numberOfDaysForWateringRoutine, 'days')//.format("MMM Do YYYY");
      const nextWater = moment(nextWaterDate).startOf('day').fromNow()
      const today = moment().format('YYYY-MM-DD')
      const startOfThisYear = moment().format('YYYY-01-01')
      return {...userplant, nextWater, today, startOfThisYear}
    })
    res.render("dashboard/profile", { user, userplants })
  })
});  



  router.post("/:id",  (req, res, next) => {

    const plantId = req.params.id;
    const {lastWater } = req.body;
    
    UserPlant.findByIdAndUpdate(plantId, {lastWater: lastWater})

    .then((plant) => {
      console.log(`Last Water date updated to: ${plant.lastWater}`)
      res.redirect("/profile")
    })
    .catch(error => {
      console.log(error)
    })

    })



module.exports = router;
