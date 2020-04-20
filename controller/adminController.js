const Club = require('../models/clubs')
const mongoose = require('mongoose');
const MONGODB_CONNECT = 'mongodb://localhost:27017/test';

exports.postCreateClub = (req,res,next) => {
    var clubName = req.body.club_name;
    var clubHeadEmail = req.body.head_email;
    var clubDescription = req.body.club_description;
    var image = req.file.path;
    const club = new Club({
        clubName : clubName,
        clubHead : {
            email : clubHeadEmail
        },
        clubImagePath : image,
        clubDescription : clubDescription,

    })

    console.log(image)

    club.save().then( message => {
        console.log(message);
        res.redirect('/');
    }).catch( err =>{
        console.log(err);
        res.redirect('/create-club');
    });

    // res.render('admin-create-club',{
    //     isAuthenticated: req.session.isLoggedIn
    // });
    
}