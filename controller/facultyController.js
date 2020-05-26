const Faculty = require('../models/faculty');
const User = require('../models/user');
const Event = require('../models/event');
const bcryppt = require('bcryptjs');
const constants = require('../Utils/constants');

exports.getFacultyloginDetails = (req,res,next) =>{

    const email = req.body.loginEmail; 
    const password = req.body.loginPassword;


   

    Faculty.findOne({email:email}).then(faculty => {
        if(!faculty){
            req.flash('error','Invalid Credentials')
            return res.redirect('/#loginHeadModal');
        }

        const user = {
            isAdmin : faculty.isAdmin,
            userType : faculty.userType,
            userId: faculty._id
        }

        bcryppt.compare(password,faculty.password).then( result => {
            if(result){
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
                
            }else{
                res.redirect('/#loginHeadModal');
            }
           
        }).catch(err => {
            console.log("bcrypt   err "+err);
        });
    }).catch(err => {
        console.log("user err"+err);
    });
  
}

exports.postCreateEvent = (req,res,next) => {

    const title = req.body.eventName; 
    const description = req.body.eventDescription;
    const day = req.body.eventDate.split('/')[0];
    var monthNumber  = req.body.eventDate.split('/')[1];
    if(monthNumber.charAt(0) == '0'){
        monthNumber = monthNumber.substring(1);
    }
    const year  = req.body.eventDate.split('/')[2];
    const month = constants.MONTHS[monthNumber];
    const date = day + " " + month + " " +year;
    const time = req.body.eventTime;
    const location  = req.body.eventLocation;
    const fees = req.body.eventRegistrationFees == undefined ? 0  : req.body.eventRegistrationFees ;
    const smallBanner =  req.files['smallBanner'][0].path;
    const bigBanner =  req.files['bigBanner'][0].path;
    const email = req.session.user.email;
    const currentDate = new Date().toDateString();
    const id = req.session.user._id;
    var cordinators= [];
    
    console.log(date ,constants.MONTHS[1]);

    var i =1;
    while(req.body.name[i] != undefined){
        cordinators.push(req.body.name[i].toString())
        i++;
    
    }

    const event = new Event({
        heading : title,
        description :description,
        date : date,
        time : time,
        fees : fees,
        location : location,
        images : {
            bigBanner : bigBanner,
            smallBanner : smallBanner
        },
        createdBy : {
            email : email,
            id : id,
            date : currentDate 
        },

        cordinators : cordinators
    })

    User.find().count().where('email').in(cordinators).exec((err, records) => {
        
        if(cordinators.length == records){

            event.save().then( message => {
                console.log(message);
                res.redirect('/events');
            }).catch( err =>{
                console.log(err);
                res.redirect('/#signupModal');
            });
        



        }else{

        }

    })



}