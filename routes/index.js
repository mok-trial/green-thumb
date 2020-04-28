const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  // this is basic auth syntax
  // const user = req.session.user

  // this is passport syntax
  const user = req.user;
  console.log('loggid in user: ', req.user);
  res.render('index', { user: user });
});


router.get('/about', (req, res) => {

  const user = req.user;
  res.render('about', { user: user } );
})

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




/* router.get('/profile', loginCheck(), (req, res) => {
  res.render('profile');
}); */

module.exports = router;