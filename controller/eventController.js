const Clubs = require('../models/clubs')
const Events = require('../models/event')
const User = require('../models/user')
const Faculty = require('../models/faculty')


exports.postRegisterEvent = (req,res,next) => {

    
    const clubId = req.query.clubId
    const eventId = req.query.eventId
    console.log(req)
    
    User.findById({_id : req.session.user.userId},(error , user) => {
        if(!error){
            // console.log(user.profile.college == '{}')
            if(user.profile.college == '{}'  ){
                return res.send('0');
            }else{ 
                User.findById({_id: req.session.user.userId},(error,user) => {
                    var isClubMember = false;
                    console.log("hihih  true" +user.clubsEnrolled.length)
                    for(var i = 0; i<user.clubsEnrolled.length ; i++){
                        console.log("hihih "+user.clubsEnrolled[i]+" true"+ clubId)
                        if(user.clubsEnrolled[i] == clubId){
                            console.log("hihih  true")
                            isClubMember = true;
                            break;
                        }
                    }

                    if(isClubMember){
                        User.findByIdAndUpdate({_id:req.session.user.userId},{ "$push": { "eventsEnrolled": eventId} },{ "new": true, "upsert": true },function (error, user){
                            console.log(user)
                            if(!error){

                                Events.findByIdAndUpdate({_id:eventId},{ "$push": { "enroled.students": req.session.user.userId} },{ "new": true, "upsert": true },function (error, event){
                                    console.log(user)

                                    if(!error){
                                        return res.send('1');
                                    }
                                    
                                    
                                    
                                });

                            }

                           
                        
                          });
                    }else{
                        return res.send('2');
                    }

                
                })
                
            }
            
        }
    })
   

    // Faculty.findOneAndUpdate({_id: req.session.user.userId},update,function (error,doc) {
    //     if (error){
    //       console.log(error)
    //       return res.send(400, {error: error});
          
    //     }
    //     return res.send(data);
    
    //   });


 
}

exports.getMyEvents = (req,res,next) => {

    Faculty.findById({_id:req.session.user.userId},(error,faculty) => {

        if(!error){
            Clubs.findById({_id:faculty.clubId},(error,club) => {

                if(!error){
                    Events.find({
                        '_id': { $in:club.clubEvents}
                    }, function(error, events){
                        if(!error){
                            res.render('my-events',{
                                isAuthenticated: req.session.isLoggedIn,
                                isAdmin : checKAdmin(req),
                                events:events,
                                userType : getUserType(req),
                                errorMessage : checkError(req)
                              });
                        }
                    });

                }
            })

            

        }
    })
    

}

exports.getEventApplicant = (req,res,next) => {

    Events.findById({_id : req.query.id},(error,event) => {
        if(!error){

            User.find({
                '_id': { $in:event.enroled.students}
            }, function(error, users){
                if(!error){
                    res.render('event-applicant',{
                        isAuthenticated: req.session.isLoggedIn,
                        event : event,
                        users : users,
                        isAdmin : checKAdmin(req),
                        userType : getUserType(req),
                        errorMessage : checkError(req)
                      });
                }
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
  