const Faculty = require('../models/faculty');
const User = require('../models/user');
const Event = require('../models/event');
const Clubs = require('../models/clubs');
const News = require('../models/news');
const bcryppt = require('bcryptjs');
const constants = require('../Utils/constants');
const news = require('../models/news');

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

exports.postRemoveClubMember = (req, res, next ) => {
    const clubId = req.query.clubId;
    const userId = req.query.userId;

    Clubs.updateOne({_id : clubId} , { $pull : {clubMembers : userId}},(error, clubs) => {
        if(!error){
            User.updateOne({_id : userId} , { $pull : {clubsEnrolled : clubId}},(error, user) => {
                if(!error){
                    res.redirect('/requests')
                }
            })
        }
    })
  
}

exports.postRejectUserRequest = (req, res, next ) => {
    const clubId = req.query.clubId;
    const userId = req.query.userId;

    Clubs.updateOne({_id : clubId} , { $pull : {clubMembersRequest : userId}},(error, clubs) => {
        if(!error){
            User.updateOne({_id : userId} , { $pull : {clubApplied : clubId}},(error, user) => {
                if(!error){
                    res.redirect('/requests')
                }
            })
        }
    })
  
}

exports.postCreateEvent = (req,res,next) => {

    const title = req.body.eventName; 
    const description = req.body.eventDescription;
    const date = getDateInFormat(req.body.eventDate);
    const time = req.body.eventTime;
    const endCode = convertDateTime(req.body.eventEndDate,req.body.eventEndTime)
    const startCode = convertDateTime(req.body.eventStartDate,req.body.eventStartTime)
    const location  = req.body.eventLocation;
    const fees = req.body.eventRegistrationFees == undefined ? 0  : req.body.eventRegistrationFees ;
    const smallBanner = req.files['smallBanner'] == undefined ? 0  : req.files['smallBanner'][0].path;
    const bigBanner = req.files['bigBanner'] == undefined ? 0  : req.files['bigBanner'][0].path;
    const email = req.session.user.email;
    const currentDate = new Date().toDateString();
    const id = req.session.user._id;
    var cordinators= [];
    
   

    var i =1;
    while(req.body.name[i] != undefined){
        cordinators.push(req.body.name[i].toString())
        i++;
    
    }



    User.find().count().where('email').in(cordinators).exec((err, records) => {

        if(!err){
            if(cordinators.length == records){


                Faculty.findById({_id : req.session.user.userId },(error,faculty) => {

                    if(!error){

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
                                email : faculty.email,
                                id : faculty.clubId,
                                date : currentDate 
                            },
                    
                            cordinators : cordinators
                        })
                        
                        event.save().then( message => {
                            console.log(message);
                            Clubs.findByIdAndUpdate({_id:faculty.clubId},{ "$push": { "clubEvents": message._id} },{ "new": true, "upsert": true },function (error, club){
                        
                                if(!error){
                                    res.redirect('/events');
                                }
                    
                            });
                            
                        }).catch( err =>{
                            console.log(err);
                            res.redirect('/#signupModal');
                        });

                    }
                })

                
            
    
    
    
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

    var dateCoded = new Date(parseInt(year),parseInt(monthNumber)-1,parseInt(day),parseInt(hour),parseInt(minutes)); // some mock date
    var milliseconds = dateCoded.getTime();
    return milliseconds;

}

function getDateInFormat(date){
   
    if(date == ""){
        return;
    }
    const day = date.split('/')[0];
    var monthNumber  = date.split('/')[1] ;
    console.log(monthNumber)
    if(monthNumber.charAt(0) == '0'){
        monthNumber = monthNumber.substring(1);
    }

    const year  = date.split('/')[2];
    const month = constants.MONTHS[parseInt(monthNumber)-1];

    return day + " " + month + " " +year;

}

exports.getNewsPost = (req,res,next) =>{

    Clubs.findOne({clubHead : req.session.user.userId},(error , doc) => {
        if(!error){
            Event.find({_id :{$in : doc.clubEvents}},( error ,event) => {
                if(!error){
                    res.render('news-post',{
                        isAuthenticated: req.session.isLoggedIn,
                        isAdmin : checKAdmin(req),
                        userType : getUserType(req),
                        errorMessage : checkError(req),
                        events : event
                      });
                }else{
                    console.log(error)
                }
            })
        }else{
            console.log(error)
        }
    })

}

exports.postNewsPost = (req,res,next) => {

    let tag = req.query.tag;
    let heading = req.body.heading;
    let shortDescription = req.body.shortDescription;
    let fullDescription = req.body.fullDescription;
    let eventId = req.body.event;
    let newsImage = req.files['newsImages'] == undefined ? 0  : req.files['newsImages'][0].path;
    let date = getDateInFormat(new Date().toLocaleDateString());
    let time = new Date().toTimeString();


    Faculty.findOne({_id : req.session.user.userId},(error,faculty) =>{
        console.log("inside")
        if(!error){
            console.log("inside")
            Clubs.findOne({_id : faculty.clubId},(error, club ) => {
                if(!error){
                    console.log("inside")
                    var news;
                    if(tag == "General"){
                        console.log("inside")
                        news = new News({
                            Type : tag,
                            Heading : heading,
                            description : {
                                short : shortDescription,
                                full : fullDescription
                            },
                            images : newsImage,
                            PublishedBy : faculty.name.first + " " + faculty.name.last,
                            createdBy : {
                                email : faculty.email,
                                id : faculty._id,
                                date : date,
                                time : time
                            },
                        })  
                    }else if(tag == "ClubRelated"){
                        news = new News({
                            Type : tag,
                            Heading : heading,
                            description : {
                                short : shortDescription,
                                full : fullDescription
                            },
                            EventInfo : {
                                EventId : "",
                                ClubId : club._id
                            },
                            images : newsImage,
                            PublishedBy : faculty.name.first + " " + faculty.name.last,
                            createdBy : {
                                email : faculty.email,
                                id : faculty._id,
                                date : date,
                                time : time
                            },
                        })  

                    }else if(tag == "EventRelated"){
                        news = new News({
                            Type : tag,
                            Heading : heading,
                            description : {
                                short : shortDescription,
                                full : fullDescription
                            },
                            EventInfo : {
                                EventId : eventId,
                                ClubId : club._id
                            },
                            images : newsImage,
                            PublishedBy : faculty.name.first + " " + faculty.name.last,
                            createdBy : {
                                email : faculty.email,
                                id : faculty._id,
                                date : date,
                                time : time
                            },
                        })  
                    }

                    news.save().then(message => {
                        console.log(message+"sucss")
                        return res.send("success");
                    }).catch(error => {
                        console.log(error+"error")
                        return res.send(error);
                    })
                }
               
            })
        }
    })

    
   
 
    

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


function checkError(req){
    let message = req.flash('error');
    if(message.length > 0){
      message = message[0];
    }else{
      message = null;
    }
    return message;
  }
  



function checKAdmin(req){
    var isAdmin = false;
  
  
    try{
      if (req.session.isLoggedIn) {
        if(req.session.user.isAdmin){
          isAdmin = true;
        }
      }
    }finally{
  
    }
   
    
  
    return isAdmin;
  
  
  } 
  
  function getUserType(req){
    if(req.session.isLoggedIn){
      return req.session.user.userType
    }
    return 0
  }


  function checkEmpty(value){

    if(value == '' ){
      return true
    }
  
    return false
  }
  
