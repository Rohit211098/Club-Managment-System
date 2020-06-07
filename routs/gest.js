const express = require('express');
const auth = require('../controller/authController');
const GustController = require('../controller/gestController');
const Auth = require("../middleware/auth");

const router = express.Router();
router.post('/login',auth.getlogindetails);

 router.post('/signup',auth.getSignUpDetails);
 
router.get('/profile',Auth.getAuth,GustController.getProfile);
router.get('/apply-club',Auth.getAuth,GustController.getApplyClub);

router.get('/clubs',GustController.getClubs);

router.get('/about',GustController.getAbout)
 router.get('/club-single',GustController.getClubsSingle)
router.get('/contact',GustController.getContact)
router.get('/requests',GustController.getUserRequests)

router.get('/events',GustController.getEvents)
 router.get('/event-single',GustController.getEventSingle)
router.get('/notice-single',GustController.getNoticeSingle)
router.get('/notice',GustController.getNotice)
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