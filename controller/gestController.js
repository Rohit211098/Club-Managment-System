const Clubs = require('../models/clubs')
const Events = require('../models/event')
const User = require('../models/user')
const Faculty = require('../models/faculty')

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
       clubs : clubs
        
      });
  
    }else{
      res.render('clubs',{
      isAuthenticated: req.session.isLoggedIn, 
      clubs : clubs  
    });
   }

  })

  
   
}
 


exports.getIndex = (req,res,next) => {

  Clubs.find({}).limit(3).exec( (err, clubs) => {
    res.render('index',{
      isAuthenticated: req.session.isLoggedIn,
      isAdmin : checKAdmin(req),
      clubs : clubs,
      userType : getUserType(req)
    
    });
    
  })
}


exports.getNotice = (req,res,next) => {
  res.render('notice',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : getUserType(req)
  });
}

exports.getNoticeSingle = (req,res,next) => {
  res.render('notice-single',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : getUserType(req)
  });
}

exports.getEventSingle = (req,res,next) => {

  // console.log(req.query.id)

  Events.findOne({_id : req.query.id},(err,event) => {
   
      return new Promise(event => {})
  }).then(event => {
    res.render('event-single',{
      isAuthenticated: req.session.isLoggedIn,
      isAdmin : checKAdmin(req),
      userType : getUserType(req),
      event : event
    });
  }).catch(error => {
    res.redirect('/events');
  })
 
}


exports.getEvents = (req,res,next) => {


  Events.find({},(err,events) => {
    return new Promise( events => {})
  }).then(events => {

    console.log(events)
    res.render('events',{
      isAuthenticated: req.session.isLoggedIn,
      isAdmin : checKAdmin(req),
      userType : getUserType(req),
      events : events
    });

  })
 
}

exports.getContact = (req,res,next) => {
  res.render('contact',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : getUserType(req)
  });
}

exports.getClubsSingle = (req,res,next) => {
  res.render('club-single',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : getUserType(req)
  });
}

exports.getAbout = (req,res,next) => {
  res.render('about',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : getUserType(req)
  });
}

exports.getProfile = (req,res,next) => {


  if(getUserType(req) > 8){

    Faculty.findOne({_id : req.session.user.userId}).then(user => {

      console.log(user.profile.gender)

      if(getUserType(req) == 10){
        Clubs.findOne({_id : user.clubId}).then(club => { 

          res.render('faculty-profile',{
            isAuthenticated: req.session.isLoggedIn,
            isAdmin : checKAdmin(req),
            userType : getUserType(req),
            user : user,
            club : club
            
          });
  
        })

      }else{
        res.render('faculty-profile',{
          isAuthenticated: req.session.isLoggedIn,
          isAdmin : checKAdmin(req),
          userType : getUserType(req),
          user : user,
    
          
        });

      }
      
  
     
  
  
    })




  }else{

    User.findOne({_id : req.session.user.userId}).then(user => {

      console.log(user.profile.gender)
  
      res.render('profile',{
        isAuthenticated: req.session.isLoggedIn,
        isAdmin : checKAdmin(req),
        userType : getUserType(req),
        user : user
        
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
  }



  Faculty.findOneAndUpdate({_id: req.session.user.userId},update,function (error,doc) {
    if (error){
      console.log(error)
      return res.send(400, {error: error});
      
    }
    return res.send(data);

  });

  console.log(req.session.user.userId)

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

  console.log(update)


  Clubs.findOneAndUpdate({_id: req.query.id},update,function (error,doc) {
  
    if (error){
      console.log(error)
      return res.send(400, {error: error});
      
    }
    return res.send(data);

  });

  // console.log(req.query)
  

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
  }

 
  console.log( req.body.gender)


  User.findOneAndUpdate({_id: req.session.user.userId},update,function (error,doc) {
    if (error){
      console.log(error)
      return res.send(400, {error: error});
      
    }
    return res.send(data);

  });

  console.log(req.session.user.userId)

}


function checkEmpty(value){

  if(value == '' ){
    return true
  }

  return false
}
