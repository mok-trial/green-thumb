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


    const user = req.user;
    res.render('addPlant/addPlantCustom', { user: user} );


  });


  module.exports = router;