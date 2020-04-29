const express = require("express");
const router = express.Router();
const uploadCloud = require("../../config/cloudinary.js");
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


    const user = req.user;
    const userPlant = UserPlant.schema.obj.waterSchedule.enum;


    res.render('addPlant/addPlantCustom', { user, userPlant } );

  });


  router.post("/", uploadCloud.single("photo"), loginCheck(),  (req, res, next) => {

    const {customName, waterSchedule, notes} = req.body;
 
    const imgPath = req.file.url;
    const imgName = req.file.originalname;

    const userId = req.user._id


    UserPlant.create({customName, waterSchedule, notes, imgPath, imgName})
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