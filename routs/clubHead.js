const express = require('express');
const router = express.Router();
const HeadController = require('../controller/clubHeadController')


router.post('/loginHead',HeadController.getHeadlogindetails);








module.exports = router;

