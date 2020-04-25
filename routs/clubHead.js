const express = require('express');
const router = express.Router();
const HeadController = require('../controller/clubHeadController')


router.post('/loginHead',HeadController.getHeadlogindetails);

router.post('/create-event',HeadController.postCreateEvent);








module.exports = router;

