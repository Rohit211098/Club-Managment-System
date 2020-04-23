const Clubs = require('../models/clubs')


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
  res.render('event-single',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : getUserType(req)
  });
}


exports.getEvents = (req,res,next) => {
  res.render('events',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : getUserType(req)
  });
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

  res.render('profile',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : getUserType(req),
    nameFirst:req.session.user.profile.firstName,
    nameLast : req.session.user.profile.lastName,
  });
  
  
}
