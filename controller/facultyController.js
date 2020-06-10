const Faculty = require('../models/faculty');
const User = require('../models/user');
const Event = require('../models/event');
const Clubs = require('../models/clubs')
const bcryppt = require('bcryptjs');
const constants = require('../Utils/constants');

exports.getFacultyloginDetails = (req,res,next) =>{

    const email = req.body.loginEmail; 
    const password = req.body.loginPassword;


   

    Faculty.findOne({email:email}).then(faculty => {
        if(!faculty){
            req.flash('error','Invalid Credentials')
            return res.redirect('/#loginFacultyModal');
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
                req.flash('error','Invalid Credentials')
                res.redirect('/#loginFacultyModal');
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
    const date = getDateInFormat(req.body.eventDate);
    const time = req.body.eventTime;
    const endCode = convertDateTime(req.body.eventStartDate,req.body.eventStartTime)
    const startCode = convertDateTime(req.body.eventEndDate,req.body.eventEndTime)
    const location  = req.body.eventLocation;
    const fees = req.body.eventRegistrationFees == undefined ? 0  : req.body.eventRegistrationFees ;
    const smallBanner =     req.files['smallBanner'] == undefined ? 0  : req.files['smallBanner'][0].path;
    const bigBanner =    req.files['bigBanner'] == undefined ? 0  : req.files['bigBanner'][0].path;
    const email = req.session.user.email;
    const currentDate = new Date().toDateString();
    const id = req.session.user._id;
    var cordinators= [];
    
   

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
        isExpired : false,
        location : location,
        timeCoded: {
            start : startCode,
            end : endCode
        },
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

        if(!err){
            if(cordinators.length == records){

                event.save().then( message => {
                    console.log(message);
                    res.redirect('/events');
                }).catch( err =>{
                    console.log(err);
                    res.redirect('/#signupModal');
                });
            
    
    
    
            }else{
                console.log("cordinator problem")
            }
        }else{
            console.log("error "+err)
        }
        
       

    })



}

function convertDateTime(date,time){

    let day = date.split('/')[0];
    let monthNumber  = date.split('/')[1];
    let year  = date.split('/')[2];

    let hour  = time.split(':')[0];
    let minutes  = time.split(':')[1];

    var dateCoded = new Date(parseInt(year),parseInt(monthNumber),parseInt(day),parseInt(hour),parseInt(minutes)); // some mock date
    var milliseconds = dateCoded.getTime();
    return milliseconds;

}

function getDateInFormat(date){
   
    if(date == ""){
        return;
    }
    const day = date.split('/')[0];
    var monthNumber  = date.split('/')[1];
    if(monthNumber.charAt(0) == '0'){
        monthNumber = monthNumber.substring(1);
    }
    const year  = date.split('/')[2];
    const month = constants.MONTHS[monthNumber];

    return day + " " + month + " " +year;

}

exports.postAccept = (req,res,next) =>{

    let clubId = req.query.clubId;
    let userId = req.query.userId;

    Clubs.updateOne({_id : clubId}, { $pullAll: {clubMembersRequest: [userId] }},(error,club) => {
        console.log(club);
        if(!error){
            User.updateOne({_id : userId}, { $pullAll: {clubApplied: [clubId] }},(error,club) => {
                console.log(club);
            })
        }
    })

    Clubs.findByIdAndUpdate({_id:clubId},{ "$push": { "clubMembers": userId} },{ "new": true, "upsert": true },function (error, club){

        if(!error){
          User.findByIdAndUpdate({_id:userId},{ "$push": { "clubsEnrolled": clubId} },{ "new": true, "upsert": true },function (error, user){
            console.log(user)
    
            res.redirect('/requests');
          });
        }
      })

    


}