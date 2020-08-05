const express = require('express');
const router = express.Router();
const FacultyController = require('../controller/facultyController')

const Auth = require('../middleware/auth')


router.post('/loginFaculty',FacultyController.getFacultyloginDetails);

router.post('/create-event',FacultyController.postCreateEvent);
router.post('/accept',Auth.getAuth,Auth.getIsHead,FacultyController.postAccept);
router.get('/news-post',Auth.getAuth,Auth.getIsHead,FacultyController.getNewsPost);
router.post('/news-post',Auth.getAuth,Auth.getIsHead,FacultyController.postNewsPost);








module.exports = router;

