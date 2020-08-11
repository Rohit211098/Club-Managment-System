const Clubs = require('../models/clubs')
const Events = require('../models/event')
const User = require('../models/user')
const Faculty = require('../models/faculty')
const News = require('../models/news')

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




exports.getClubs = (req,res,next) => {

  var localClubs

  Clubs.find({},(err,clubs) => {
    return new Promise( clubs => {})
  }).then(clubs => {

    if(checKAdmin(req)){
     
      res.render('admin-clubs',{
      isAuthenticated: req.session.isLoggedIn,
      clubs : clubs,
      errorMessage : checkError(req),
      path : "/clubs"
      });
  
    }else{
      res.render('clubs',{
      isAuthenticated: req.session.isLoggedIn, 
      clubs : clubs ,
      errorMessage : checkError(req) ,
      path : "/clubs"
    });
   }

  })

  
   
}
 


exports.getIndex = (req,res,next) => {

  Clubs.find({}).limit(3).exec( (err, clubs) => {

    if (!err) {

      Events.find({}).limit(3).exec( (err, events) => {

        Faculty.count().exec(function (err, count) {

          
          var random = Math.floor(Math.random() * count)
        
         
          Faculty.find().skip(random).limit(3).exec(
            function (error, faculty) {


              News.find({}).limit(3).exec((error , news) => {
                if (!error) {
                  res.render('index',{
                    isAuthenticated: req.session.isLoggedIn,
                    isAdmin : checKAdmin(req),
                    clubs : clubs,
                    events : events,
                    facultys : faculty,
                    news : news,
                    userType : getUserType(req),
                    errorMessage : checkError(req),
                    path : "/"
                  
                  });
                }
              })

            })
        })


      })
      
    }

    
  })
}


exports.getNews = (req,res,next) => {

  News.find({},(error, news) => {

    if(!error){
      res.render('news',{
        isAuthenticated: req.session.isLoggedIn,
        isAdmin : checKAdmin(req),
        userType : getUserType(req),
        news : news ,
        path : "/news"
      });
    }
  })

  
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


exports.getNewsDetails = (req,res,next) => {

  var newsId = req.query.id;

  News.findOne({_id : newsId},(error , news) => {
    if(!error){
      res.render('news-single',{
        isAuthenticated: req.session.isLoggedIn,
        isAdmin : checKAdmin(req),
        userType : getUserType(req),
        errorMessage : checkError(req),
        news : news,
        path : "/newsDetails"
      });
    }
   
  })

  
}

exports.getEventSingle = (req,res,next) => {

  // console.log(req.query.id)

  Events.findOne({_id : req.query.id},(err,event) => {
   
      return new Promise(event => {})
  }).then(event => {



    let cordintor = []
    let isStarted = false;
    var j = 1;

    if(req.session.user.userType < 9){

      User.findById({_id : req.session.user.userId },(error,currentUser) => {
        var isApplyed = false;
        if(!error&&currentUser != null){
          for(var i = 0; i<currentUser.eventsEnrolled.length ; i++){
            if(currentUser.eventsEnrolled[i] == event._id){
                isApplyed = true;
                break;
            }
          }
          console.log(isApplyed)
        
  
            for(i in event.cordinators){
              // console.log()
              User.findOne({email : event.cordinators[i] },(error,user) => {
                  return new Promise(user => {})
              }).then(user => {
               
          
                cordintor.push(user) ;
              
        
        
                if(cordintor.length == event.cordinators.length){
                  
                
                  
                  if(!event.isExpired){
                
                  
                    if( checkEventExpiration(event)){
      
                      Events.findOneAndUpdate({_id : req.query.id},{isExpired : true},(err,eventUpdate) => {
                        console.log(isApplyed)
                        res.render('event-single',{
                          isAuthenticated: req.session.isLoggedIn,
                          isAdmin : checKAdmin(req),
                          userType : getUserType(req),
                          event : eventUpdate,
                          cordinators : cordintor,
                          isRegStarted : true,
                          isApplied : isApplyed,
                          errorMessage : checkError(req),
                          path : "/event-single"
                        });
                      })
                      
              
                    }else{
                      console.log(isApplyed)
                      res.render('event-single',{
                        isAuthenticated: req.session.isLoggedIn,
                        isAdmin : checKAdmin(req),
                        userType : getUserType(req),
                        event : event,
                        cordinators : cordintor,
                        isApplied : isApplyed,
                        isRegStarted : isRegStarted(event.timeCoded.start),
                        errorMessage : checkError(req),
                        path : "/event-single"
                      });
                    }
                  }else{
                
                    console.log(isApplyed)
                    res.render('event-single',{
                      isAuthenticated: req.session.isLoggedIn,
                      isAdmin : checKAdmin(req),
                      userType : getUserType(req),
                      event : event,
                      cordinators : cordintor,
                      isRegStarted : true,
                      isApplied : isApplyed,
                      errorMessage : checkError(req),
                      path : "/event-single"
                    });
                
                  }
                
          
                }
                
              })
              
        
           
            }
            
  
          
        }
      })

    }else{
      Faculty.findById({_id : req.session.user.userId },(error,currentUser) => {
        var isApplyed = false;
        if(!error&&currentUser != null){
          
          console.log(isApplyed)
        
  
            for(i in event.cordinators){
              // console.log()
              User.findOne({email : event.cordinators[i] },(error,user) => {
                  return new Promise(user => {})
              }).then(user => {
               
          
                cordintor.push(user) ;
              
        
        
                if(cordintor.length == event.cordinators.length){
                  
                
                  
                  if(!event.isExpired){
                
                  
                    if( checkEventExpiration(event)){
      
                      Events.findOneAndUpdate({_id : req.query.id},{isExpired : true},(err,eventUpdate) => {
                        console.log(isApplyed)
                        res.render('event-single',{
                          isAuthenticated: req.session.isLoggedIn,
                          isAdmin : checKAdmin(req),
                          userType : getUserType(req),
                          event : eventUpdate,
                          cordinators : cordintor,
                          isRegStarted : true,
                          isApplied : isApplyed,
                          errorMessage : checkError(req),
                          path : "/event-single"
                        });
                      })
                      
              
                    }else{
                      console.log(isApplyed)
                      res.render('event-single',{
                        isAuthenticated: req.session.isLoggedIn,
                        isAdmin : checKAdmin(req),
                        userType : getUserType(req),
                        event : event,
                        cordinators : cordintor,
                        isApplied : isApplyed,
                        isRegStarted : isRegStarted(event.timeCoded.start),
                        errorMessage : checkError(req),
                        path : "/event-single"
                      });
                    }
                  }else{
                
                    console.log(isApplyed)
                    res.render('event-single',{
                      isAuthenticated: req.session.isLoggedIn,
                      isAdmin : checKAdmin(req),
                      userType : getUserType(req),
                      event : event,
                      cordinators : cordintor,
                      isRegStarted : true,
                      isApplied : isApplyed,
                      errorMessage : checkError(req),
                      path : "/event-single"
                    });
                
                  }
                
          
                }
                
              })
              
        
           
            }
            
  
          
        }
      })
    }

  }).catch(error => {
    console.log(error)
    res.redirect('/events');
  })
 
}


exports.getEvents = (req,res,next) => {

  Events.find({},(err,events) => {
    return new Promise( events => {})
  }).then(events => {

  
    res.render('events',{
      isAuthenticated: req.session.isLoggedIn,
      isAdmin : checKAdmin(req),
      userType : getUserType(req),
      events : events,
      errorMessage : checkError(req),
      path : "/events"
    });

  })
 
}

exports.getContact = (req,res,next) => {
  res.render('contact',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : getUserType(req),
    errorMessage : checkError(req)
  });
}

exports.getClubsSingle = (req,res,next) => {

  Clubs.findOne({_id : req.query.id}).then(club => {

    Faculty.findOne({_id : club.clubHead}).then( head => {

      var userId =null;
     

      if(req.session.isLoggedIn && req.session.user.userType == 0){
        userId =  req.session.user.userId;
        User.findById({_id : req.session.user.userId}).then(user => {

          let isEnrolled = false;

          if(user.clubApplied.length > 0){

            user.clubApplied.forEach(element => {
            
              if (element == req.query.id){
                isEnrolled = true;
               
              }
            });

          }

          if(user.clubsEnrolled.length > 0){

            user.clubsEnrolled.forEach(element => {
            
              if (element == req.query.id){
                isEnrolled = true;
               console.log("test === "+element +"  ------   "+req.query.id)
              }
            });

          }

          console.log(isEnrolled)

          if(isEnrolled){

            return  res.render('club-single',{
              isAuthenticated: req.session.isLoggedIn,
              isAdmin : checKAdmin(req),
              userType : getUserType(req),
              club : club,
              head : head,
              isApplied : true,
              userId : userId,
              errorMessage : checkError(req),
              path : "/club-single"
            });
    
          }else{
    
            res.render('club-single',{
              isAuthenticated: req.session.isLoggedIn,
              isAdmin : checKAdmin(req),
              userType : getUserType(req),
              club : club,
              head : head,
              isApplied : false,
              userId : userId,
              errorMessage : checkError(req),
              path : "/club-single"
            });
           
          }


        })
      }else{
        console.log("free")
        res.render('club-single',{
          isAuthenticated: req.session.isLoggedIn,
          isAdmin : checKAdmin(req),
          userType : getUserType(req),
          club : club,
          head : head,
          isApplied : false,
          userId : userId,
          errorMessage : checkError(req),
          path : "/club-single"
        });
      }


    }).catch(error => {

      console.log(error)

    })

    
  }).catch(error => {

    console.log(error)

  })
  
}

function notInClub(res,req){
  res.render('club-single',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : getUserType(req),
    club : club,
    head : head,
    isApplied : false,
    userId : userId,
    errorMessage : checkError(req)
  });
}


exports.getAbout = (req,res,next) => {
  res.render('about',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : getUserType(req),
    errorMessage : checkError(req),
    path : "/about"
  });
}

exports.getProfile = (req,res,next) => {


  if(getUserType(req) > 8){

    Faculty.findOne({_id : req.session.user.userId}).then(user => {

      

      if(getUserType(req) == 10){
        Clubs.findOne({_id : user.clubId}).then(club => { 

          res.render('faculty-profile',{
            isAuthenticated: req.session.isLoggedIn,
            isAdmin : checKAdmin(req),
            userType : getUserType(req),
            user : user,
            club : club,
            errorMessage : checkError(req),
            path : "/profile"
            
          });
  
        })

      }else{
        res.render('faculty-profile',{
          isAuthenticated: req.session.isLoggedIn,
          isAdmin : checKAdmin(req),
          userType : getUserType(req),
          user : user,
          errorMessage : checkError(req),
          path : "/profile"
    
          
        });

      }
    })




  }else{

    User.findOne({_id : req.session.user.userId}).then(user => {

     
  
      res.render('profile',{
        isAuthenticated: req.session.isLoggedIn,
        isAdmin : checKAdmin(req),
        userType : getUserType(req),
        user : user,
        path : "/profile"
        
      });
  
  
    })
  }

  
}


exports.postFacultySave = (req,res,next)  => {

  var update = {}
  var data = 'success'

  if(req.query.type === 'publicInfo'){
    if(!checkEmpty(req.body.Biography)){  
      update = Object.assign(update, {'profile.Biography' : req.body.Biography  })
    }
    if(!checkEmpty(req.body.dob)){  
      update = Object.assign(update,{'profile.birth_date' : req.body.dob})
    }
  
  }else if(req.query.type === 'personalInfo'){



    if(!checkEmpty(req.body.firstName)){  
      update = Object.assign(update,{'profile.firstName' : req.body.firstName})
    }

    if(!checkEmpty(req.body.lastName)){
      update = Object.assign(update,{'profile.lastName' : req.body.lastName})
    }


    if(!checkEmpty(req.body.email)){
      update = Object.assign(update,{'email' : req.body.email})
    }

    if(!checkEmpty(req.body.addressText)){
      update = Object.assign(update,{'profile.address.text_address' : req.body.addressText})
    }

    if(!checkEmpty(req.body.city)){
      update = Object.assign(update,{'profile.address.city' : req.body.city})
    }


    if(!checkEmpty(req.body.state)){
      update = Object.assign(update,{'profile.address.state' : req.body.state})
    }

    if(!checkEmpty(req.body.zip)){
      update = Object.assign(update,{'profile.address.pincode' : req.body.zip})
    }

    if(!checkEmpty(req.body.gender)){
      update = Object.assign(update,{'profile.gender' : req.body.gender})
    }
  }else if(req.query.type === 'profileImage'){

    update ={ $set: {'profile.profileImage' : req.files['profileImage'][0].path }}
    data = req.files['profileImage'][0].path

  }else if(req.query.type === 'collegeInfo'){

    if(!checkEmpty(req.body.name)){  
      update = Object.assign(update,{'profile.college.college_name' : req.body.name})
    }

    if(!checkEmpty(req.body.code)){  
      update = Object.assign(update,{'profile.college.college_code' : parseInt(req.body.code) })
    }

    if(!checkEmpty(req.body.corse)){  
      update = Object.assign(update,{'profile.college.course_name' : req.body.corse})
    }

    if(!checkEmpty(req.body.branch)){  
      update = Object.assign(update,{'profile.college.branch_name' : req.body.branch})
    }

    if(!checkEmpty(req.body.position)){  
      update = Object.assign(update,{'profile.college.position' : req.body.position})
    }

  


  }else if(req.query.type === 'socialInfo'){

    if(!checkEmpty(req.body.facebook)){  
      update = Object.assign(update,{'profile.social_media.facebook' : req.body.facebook})
    }
    if(!checkEmpty(req.body.twitter)){  
      update = Object.assign(update,{'profile.social_media.twitter' : req.body.twitter})
    }


  }



  Faculty.findOneAndUpdate({_id: req.session.user.userId},update,function (error,doc) {
    if (error){
      console.log(error)
      return res.send(400, {error: error});
      
    }
    return res.send(data);

  });



}


exports.saveClubInfo = (req,res,next)  => {


  var update = {}
  var data = "success"

  if(!checkEmpty(req.body.description)){  
    update = Object.assign(update, {'clubDescription' : req.body.description  })
  }
  if( req.files['clubBanner'] != undefined ){  
    update = Object.assign(update, {'clubImageBig' : req.files['clubBanner'][0].path  })
  }
  if( req.files['clubLogo'] != undefined){  
    update = Object.assign(update, {'clubImagePath' : req.files['clubLogo'][0].path  })
    data = req.files['clubLogo'][0].path;
  }

  


  Clubs.findOneAndUpdate({_id: req.query.id},update,function (error,doc) {
  
    if (error){
      console.log(error)
      return res.send(400, {error: error});
      
    }
    return res.send(data);

  });

  // console.log(req.query)
  

}

exports.getApplyClub = (req,res,next) =>{



  Clubs.findByIdAndUpdate({_id:req.query.id},{ "$push": { "clubMembersRequest": req.query.sId } },{ "new": true, "upsert": true },function (error, club){

    if(!error){
      User.findByIdAndUpdate({_id:req.query.sId},{ "$push": { "clubApplied": req.query.id } },{ "new": true, "upsert": true },function (error, user){
        

        res.redirect('/clubs');
      });
    }
  })


}

exports.getUserRequests = (req,res,next) =>{

  let userRequests,members;

  Faculty.findOne({_id : req.session.user.userId},(error,faculty)=>{
    Clubs.findOne({_id : faculty.clubId},(error,club)=>{

      User.find({
        '_id': { $in: club.clubMembersRequest}
    }, function(err, userRequests){

      if(!err){
        User.find({
          '_id': { $in: club.clubMembers}
        }, function(err, userMembers){
  
        res.render('user-requests.ejs',{
          isAuthenticated: req.session.isLoggedIn, 
          errorMessage : checkError(req) ,
          requests : userRequests,
          members : userMembers,
          clubId : faculty.clubId,
          path : "/requests"
          
        });

      });

      
      }else{
        console.log(err)
      }

      

      
         
    
         
    });

     

    })
  })

  
 
  
}












exports.postSave = (req,res,next) => {

  var update = {}
  var data = 'success'

  if(req.query.type === 'publicInfo'){
    if(!checkEmpty(req.body.Biography)){  
      update = Object.assign(update, {'profile.Biography' : req.body.Biography  })
    }
    if(!checkEmpty(req.body.dob)){  
      update = Object.assign(update,{'profile.birth_date' : req.body.dob})
    }
  
  }else if(req.query.type === 'profileImage'){

    update ={ $set: {'profile.profileImage' : req.files['profileImage'][0].path }}
    data = req.files['profileImage'][0].path

  }else if(req.query.type === 'personalInfo'){



    if(!checkEmpty(req.body.firstName)){  
      update = Object.assign(update,{'profile.firstName' : req.body.firstName})
    }

    if(!checkEmpty(req.body.lastName)){
      update = Object.assign(update,{'profile.lastName' : req.body.lastName})
    }


    if(!checkEmpty(req.body.email)){
      update = Object.assign(update,{'email' : req.body.email})
    }

    if(!checkEmpty(req.body.addressText)){
      update = Object.assign(update,{'profile.address.text_address' : req.body.addressText})
    }

    if(!checkEmpty(req.body.city)){
      update = Object.assign(update,{'profile.address.city' : req.body.city})
    }


    if(!checkEmpty(req.body.state)){
      update = Object.assign(update,{'profile.address.state' : req.body.state})
    }

    if(!checkEmpty(req.body.zip)){
      update = Object.assign(update,{'profile.address.pincode' : req.body.zip})
    }

    if(!checkEmpty(req.body.gender)){
      update = Object.assign(update,{'profile.gender' : req.body.gender})
    }
  }else if(req.query.type === 'collegeInfo'){

    if(!checkEmpty(req.body.name)){  
      update = Object.assign(update,{'profile.college.college_name' : req.body.name})
    }

    if(!checkEmpty(req.body.code)){  
      update = Object.assign(update,{'profile.college.college_code' : parseInt(req.body.code) })
    }

    if(!checkEmpty(req.body.corse)){  
      update = Object.assign(update,{'profile.college.course_name' : req.body.corse})
    }

    if(!checkEmpty(req.body.branch)){  
      update = Object.assign(update,{'profile.college.branch_name' : req.body.branch})
    }

    if(!checkEmpty(req.body.semister)){  
      update = Object.assign(update,{'profile.college.semester' : parseInt(req.body.semister)})
    }


  }else if(req.query.type === 'socialInfo'){

    if(!checkEmpty(req.body.facebook)){  
      update = Object.assign(update,{'profile.social_media.facebook' : req.body.facebook})
    }
    if(!checkEmpty(req.body.twitter)){  
      update = Object.assign(update,{'profile.social_media.twitter' : req.body.twitter})
    }


  }


 
  


  User.findOneAndUpdate({_id: req.session.user.userId},update,function (error,doc) {
    if (error){
      console.log(error)
      return res.send(400, {error: error});
      
    }
    return res.send(data);

  });

  

}


function checkEmpty(value){

  if(value == '' ){
    return true
  }

  return false
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

function checkEventExpiration(events){
  // Events.find({},(err,events) => {
    
    var lastDate = events.timeCoded.end;
    const total = new Date(lastDate) - Date.parse(new Date());
    

    if(total < 0){
       return true
    }

    return false

  // })
}

function isRegStarted(date){
  if( (new Date(date) - Date.parse(new Date())) <= 0  ){
    return true;
  }

  return false;

}
