const express = require('express');
const adminController = require('../controller/adminController')

const router = express.Router();

const auth = require('../controller/authController');
const Auth = require("../middleware/auth");


router.get("/create-club",(req,res,next) => {
    res.render('admin-create-club',{
        isAuthenticated: req.session.isLoggedIn
    });
})



router.post("/create-club",adminController.postCreateClub);

router.post("/editClub",adminController.postEditClub);

router.post('/delete',adminController.postDeleteProduct);







module.exports = router;