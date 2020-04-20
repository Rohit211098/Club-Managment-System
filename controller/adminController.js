const Club = require('../models/clubs')
const GustController = require('../controller/gestController');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const MONGODB_CONNECT = 'mongodb://localhost:27017/test';

exports.postCreateClub = (req,res,next) => {
    var clubName = req.body.club_name;
    var clubHeadEmail = req.body.head_email;
    var clubDescription = req.body.club_description;
    var image = req.file.path;
   
    const club = new Club({
        clubName : clubName,
        clubDate : new Date().toLocaleDateString(),
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

exports.postEditClub = (req,res,next) => {
    var clubName = req.body.club_name;
    var clubHeadEmail = req.body.head_email;
    var clubDescription = req.body.club_description;
    console.log(req.file != undefined);
    
    if(req.file != undefined){
        var image = req.file.path;
    }
    
    var id = req.body.id;



    Club.findById(id).then(
        product => {
            product.clubName = clubName;
            product.clubHeadEmail = clubHeadEmail;
            product.clubDescription = clubDescription;

            if(image){
                product.clubImagePath = image;
            }
            
            return product.save().then(result => {
                res.redirect('/clubs');
            }).catch(error => {
                console.log(error);
                
                res.redirect('/');
            })

        }
    )

    

    // res.redirect('/clubs')

    

}