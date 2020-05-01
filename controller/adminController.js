const Club = require('../models/clubs')
const Faculty = require('../models/faculty')
const GustController = require('../controller/gestController');
const fs = require('fs');
const path = require('path');
const bcryppt = require('bcryptjs');
const mongoose = require('mongoose');
const MONGODB_CONNECT = 'mongodb://localhost:27017/test';

exports.postCreateClub = (req,res,next) => {
    var clubName = req.body.club_name;``
    var clubHeadEmail = req.body.head_email;
    var clubDescription = req.body.club_description;
    var image = req.files['image'][0].path;


    Faculty.findOne({email : clubHeadEmail}).then(user => {
        if(!user){
            res.redirect('/');
        }

        const club = new Club({
            clubName : clubName,
            clubDate : new Date().toLocaleDateString(),
            clubHead : user._id,
            clubImagePath : image,
            clubDescription : clubDescription,
    
        })
        club.save().then( message => {
             console.log(message)

             user.clubId = message._id
             user.userType = 10

             user.save().catch(error => {
                console.log(err);
                res.redirect('/create-club');
             })
            res.redirect('/');
        }).catch( err =>{
            console.log(err);
            res.redirect('/create-club');
        });



    })


    var passwordEncrypt = bcryppt.hash("123456",12).then( message => {


     

       
    
    }).catch(err =>{
        console.log(err);
    });

  

   
    
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

        Faculty.findOneAndUpdate( {_id : deletedItem.clubHead} ,{'clubId' : '','userType' : 9}, (err , destory) => {
            res.redirect('/clubs')
        })
       
    });
};