const express = require('express');
const router = express.Router();
const FacultyController = require('../controller/facultyController')


router.post('/loginFaculty',FacultyController.getFacultyloginDetails);

router.post('/create-event',FacultyController.postCreateEvent);








module.exports = router;

