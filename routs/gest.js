const express = require('express');
const auth = require('../controller/authController');
const GustController = require('../controller/gestController');
const isAuth = require("../middleware/is-auth");

const router = express.Router();
router.post('/login',auth.getlogindetails);

 router.post('/signup',auth.getSignUpDetails);
 
router.get('/profile',isAuth,GustController.getProfile);


router.get('/clubs',GustController.getClubs);

router.get('/about',GustController.getAbout)
 router.get('/club-single',GustController.getClubsSingle)
router.get('/contact',GustController.getContact)

router.get('/events',GustController.getEvents)
 router.get('/event-single',GustController.getEventSingle)
router.get('/notice-single',GustController.getNoticeSingle)
router.get('/notice',GustController.getNotice)

 router.get('/index',GustController.getIndex)

router.post('/logout',(req,res,next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
      });
   
})


 router.get('/',GustController.getIndex)

module.exports = router;