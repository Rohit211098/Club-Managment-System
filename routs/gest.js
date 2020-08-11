const express = require('express');
const auth = require('../controller/authController');
const GustController = require('../controller/gestController');
const EventController = require('../controller/eventController');
const Auth = require("../middleware/auth");

const router = express.Router();
router.post('/login',auth.getlogindetails);

 router.post('/signup',auth.getSignUpDetails);
 
router.get('/profile',Auth.getAuth,GustController.getProfile);
router.get('/apply-club',Auth.getAuth,GustController.getApplyClub);

router.get('/clubs',GustController.getClubs);
router.post('/event-registration',EventController.postRegisterEvent)
router.get('/my-events',EventController.getMyEvents)
router.get('/about',GustController.getAbout)
 router.get('/club-single',GustController.getClubsSingle)
 router.get('/event-applicant',EventController.getEventApplicant)
router.get('/contact',GustController.getContact)
router.get('/requests',GustController.getUserRequests)

router.get('/events',GustController.getEvents)
router.get('/event-single',Auth.getAuth,GustController.getEventSingle)
router.get('/newsDetails',GustController.getNewsDetails)
router.get('/news',GustController.getNews)
router.post('/signup-faculty',auth.getSignUpFacultyDetails)

router.get('/index',GustController.getIndex)


router.post('/logout',(req,res,next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
      });
   
})

router.post('/save',GustController.postSave)

router.post('/faculty-save',GustController.postFacultySave)

router.post('/club-save',GustController.saveClubInfo)


 router.get('/',GustController.getIndex)

module.exports = router;