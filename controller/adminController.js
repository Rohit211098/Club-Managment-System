const Club = require('../models/clubs')
const Head = require('../models/clubHead')
const GustController = require('../controller/gestController');
const fs = require('fs');
const path = require('path');
const bcryppt = require('bcryptjs');
const mongoose = require('mongoose');
const MONGODB_CONNECT = 'mongodb://localhost:27017/test';

exports.postCreateClub = (req,res,next) => {
    var clubName = req.body.club_name;
    var clubHeadFirstName = req.body.club_head_first;
    var clubHeadLastName = req.body.club_head_last;
    var clubHeadEmail = req.body.head_email;
    var clubDescription = req.body.club_description;
    var image = req.files['image'][0].path;


    var passwordEncrypt = bcryppt.hash("123456",12).then( message => {
        const head = new Head({
            name : {
                first : clubHeadFirstName,
                last : clubHeadFirstName,
            },
    
            password : message,
            userType: 10,
            email : clubHeadEmail
        })
        head.save().then( message => {

            const club = new Club({
                clubName : clubName,
                clubDate : new Date().toLocaleDateString(),
                clubHead : message._id,
                clubImagePath : image,
                clubDescription : clubDescription,
        
            })
            club.save().then( message => {
            
                res.redirect('/');
            }).catch( err =>{
                console.log(err);
                res.redirect('/create-club');
            });
            console.log(message._id);
            res.redirect('/');
        }).catch( err =>{
            console.log(err);
            res.redirect('/create-club');
        });
    
    }).catch(err =>{
        console.log(err);
    });

    // console.log(image)

   
    
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

exports.postDeleteProduct = (req,res,next) => {
    var id = req.body.id;

    Club.findByIdAndRemove({_id : id }, (err , deletedItem) => {
        console.log(deletedItem._id)

        Head.findByIdAndRemove( {_id : deletedItem.clubHead} , (err , destory) => {
            res.redirect('/clubs')
        })
       
    });
};