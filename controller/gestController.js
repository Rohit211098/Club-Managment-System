const Clubs = require('../models/clubs')
const Events = require('../models/event')
const User = require('../models/user')


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

  User.findOne({_id : req.session.user.userId}).then(user => {

    

    res.render('profile',{
      isAuthenticated: req.session.isLoggedIn,
      isAdmin : checKAdmin(req),
      userType : getUserType(req),
      user : user
      
    });


  })

  
  
  
}


exports.postSave = (req,res,next) => {

  var update = {}
  var data = 'success'

  if(req.query.type === 'publicInfo'){
    update ={ $set: {'profile.Biography' : req.body.Biography  }}
  }else if(req.query.type === 'profileImage'){
    update ={ $set: {'profile.profileImage' : req.files['profileImage'][0].path }}
    data = req.files['profileImage'][0].path
  }

 
  console.log(data,req.query.type)


  User.findOneAndUpdate({_id: req.session.user.userId},update,function (error,doc) {
    if (error){
      return res.send(400, {error: err});
    }
 
    return res.send(data);

  });

 

  console.log(req.session.user.userId)

}
