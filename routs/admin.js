const express = require('express');
const adminController = require('../controller/adminController')

const router = express.Router();

const auth = require('../controller/authController');
const isAuth = require("../middleware/is-auth");


router.get("/create-club",(req,res,next) => {
    res.render('admin-create-club',{
        isAuthenticated: req.session.isLoggedIn
    });
})



router.post("/create-club",adminController.postCreateClub);

router.post("/editClub",adminController.postEditClub);







module.exports = router;