const express = require("express");
const router = express.Router();
const uploadCloud = require("../../config/cloudinary.js");
const Plant = require('../../models/Plant');
const UserPlant = require('../../models/UserPlant');
const User = require('../../models/User');
const moment = require("moment");


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

  const today = moment().format('YYYY-MM-DD')
  const startOfThisYear = moment().format('YYYY-01-01')
    const user = req.user;
    const userPlant = UserPlant.schema.obj.waterSchedule.enum;


    res.render('addPlant/addPlantCustom', { user, userPlant, today, startOfThisYear} );

  });


  router.post("/", uploadCloud.single("photo"), loginCheck(),  (req, res, next) => {

    const {customName, waterSchedule, notes, lastWater} = req.body;
 
    const defaultUserImage = "https://res.cloudinary.com/rootdirectory/image/upload/v1588166094/user-plants/rootdir-assets/default-plant.png";
    let imgPath = req.file ? req.file.url : defaultUserImage;
    let imgName = req.file ? req.file.originalname : 'default-image';
   

    const userId = req.user._id


    UserPlant.create({customName, waterSchedule, notes, imgPath, imgName, lastWater})
      .then(userPlant => {

        console.log('plant added')
        User.updateOne({_id: userId}, { $push: {plantCollection: userPlant} })
        .catch(error => {
          console.log(error)
        })

      })

      .then(() => {
        res.redirect("/profile")
      })
      .catch(error => {
        console.log(error)
      });

  })



  module.exports = router;