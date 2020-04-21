const express = require('express');
const auth = require('../controller/authController');
const GustController = require('../controller/gestController');
const isAuth = require("../middleware/is-auth");

const router = express.Router();
router.post('/login',auth.getlogindetails);

 router.post('/signup',auth.getSignUpDetails);
 
router.get('/profile',isAuth,(req,res,next) => {
  console.log(req.session.user.profile.firstName);

  if(req.session.user.isAdmin){
    res.render('admin-profile',{
      isAuthenticated: req.session.isLoggedIn,
      nameFirst:req.session.user.profile.firstName,
        nameLast : req.session.user.profile.lastName,
    });
  }else{
    res.render('profile',{
      isAuthenticated: req.session.isLoggedIn,
      nameFirst:req.session.user.profile.firstName,
        nameLast : req.session.user.profile.lastName,
    
    });
  }
  
});

router.get('/create-club',isAuth,(req,res,next) => {
  console.log(req.session.user.profile.firstName);
    res.render('profile',{
    
        isAdmin:  req.session.user.isAdmin,
        if (isAuthenticated) {
          isAdmin:  req.session.user.isAdmin
        },
        nameFirst:req.session.user.profile.firstName,
        nameLast : req.session.user.profile.lastName
        
      });
});

router.get('/clubs',GustController.getClubs);

router.get('/about',(req,res,next) => {
    res.render('about',{
      
        isAuthenticated: req.session.isLoggedIn,
        if (isAuthenticated) {
          isAdmin:  req.session.user.isAdmin
        }
      });
})
 router.get('/club-single',(req,res,next) => {
    res.render('club-single',{
      
        isAuthenticated: req.session.isLoggedIn,
        if (isAuthenticated) {
          isAdmin:  req.session.user.isAdmin
        }
      });
})
router.get('/contact',(req,res,next) => {
    res.render('contact',{
     
        isAuthenticated: req.session.isLoggedIn,
        if (isAuthenticated) {
          isAdmin:  req.session.user.isAdmin
        }
      });
})
router.get('/events',(req,res,next) => {
    res.render('events',{
      
        isAuthenticated: req.session.isLoggedIn,
        if (isAuthenticated) {
          isAdmin:  req.session.user.isAdmin
        }
      });
})
 router.get('/event-single',(req,res,next) => {
    res.render('event-single',{
      
        isAuthenticated: req.session.isLoggedIn,
        if (isAuthenticated) {
          isAdmin:  req.session.user.isAdmin
        }
      });
})
router.get('/notice-single',(req,res,next) => {
    res.render('notice-single',{
      
        isAuthenticated: req.session.isLoggedIn,
        if (isAuthenticated) {
          isAdmin:  req.session.user.isAdmin
        }
      });
})
router.get('/notice',(req,res,next) => {
    res.render('notice',{
      isAdmin:  req.session.user.isAdmin,
        isAuthenticated: req.session.isLoggedIn,
        if (isAuthenticated) {
          isAdmin:  req.session.user.isAdmin
        }
      });
})

 router.get('/index',GustController.getIndex)

router.post('/logout',(req,res,next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
      });
   
})


 router.get('/',GustController.getIndex)

module.exports = router;