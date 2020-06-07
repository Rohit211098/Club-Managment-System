const express = require('express');
const router = express.Router();
const FacultyController = require('../controller/facultyController')

const Auth = require('../middleware/auth')


router.post('/loginFaculty',FacultyController.getFacultyloginDetails);

router.post('/create-event',FacultyController.postCreateEvent);
router.post('/accept',Auth.getAuth,Auth.getIsHead,FacultyController.postAccept);








module.exports = router;

