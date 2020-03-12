const express = require('express');
const auth = require('../controller/authController');
const isAuth = require("../middleware/is-auth");

const router = express.Router();
router.post('/login',auth.getlogindetails);

 router.post('/signup',auth.getSignUpDetails);
router.get('/profile',isAuth,(req,res,next) => {
  console.log(req.session.user.profile.firstName);
    res.render('profile',{
        isAuthenticated: req.session.isLoggedIn,
        nameFirst:req.session.user.profile.firstName,
        nameLast : req.session.user.profile.lastName
        
      });
});

router.get('/clubs',(req,res,next) => {
    res.render('clubs',{
        isAuthenticated: req.session.isLoggedIn
      });
})
router.get('/about',(req,res,next) => {
    res.render('about',{
        isAuthenticated: req.session.isLoggedIn
      });
})
 router.get('/club-single',(req,res,next) => {
    res.render('club-single',{
        isAuthenticated: req.session.isLoggedIn
      });
})
router.get('/contact',(req,res,next) => {
    res.render('contact',{
        isAuthenticated: req.session.isLoggedIn
      });
})
router.get('/events',(req,res,next) => {
    res.render('events',{
        isAuthenticated: req.session.isLoggedIn
      });
})
 router.get('/event-single',(req,res,next) => {
    res.render('event-single',{
        isAuthenticated: req.session.isLoggedIn
      });
})
router.get('/notice-single',(req,res,next) => {
    res.render('notice-single',{
        isAuthenticated: req.session.isLoggedIn
      });
})
router.get('/notice',(req,res,next) => {
    res.render('notice',{
        isAuthenticated: req.session.isLoggedIn
      });
})

 router.get('/index',(req,res,next) => {
    res.render('index',{
        isAuthenticated: req.session.isLoggedIn
      });
})

router.post('/logout',(req,res,next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
      });
   
})


 router.get('/',(req,res,next) => {
    res.render('index',{
        isAuthenticated: req.session.isLoggedIn
      });
})

module.exports = router;