const Clubs = require('../models/clubs')

exports.getClubs = (req,res,next) => {

    if(req.session.user.isAdmin){
        Clubs.find({},(err,clubs) => {

            res.render('admin-clubs',{
                isAuthenticated: req.session.isLoggedIn,
               clubs : clubs
                
              });
        })
      }else{
      res.render('clubs',{
        isAuthenticated: req.session.isLoggedIn, 
        clubs : clubs   
      });
   }
     
}

function checKAdmin(req){
  var isAdmin = false;

  if (req.session.isLoggedIn) {
    if(req.session.user.isAdmin){
      isAdmin = true;
    }
  }

  return isAdmin;


} 
 


exports.getIndex = (req,res,next) => {

  Clubs.find({}).limit(3).exec( (err, clubs) => {
    res.render('index',{
      isAuthenticated: req.session.isLoggedIn,
      isAdmin : checKAdmin(req),
      clubs : clubs,
      userType : req.session.user.userType
    
    });
    
  })
}


exports.getNotice = (req,res,next) => {
  res.render('notice',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : req.session.user.userType
  });
}

exports.getNoticeSingle = (req,res,next) => {
  res.render('notice-single',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : req.session.user.userType
  });
}

exports.getEventSingle = (req,res,next) => {
  res.render('event-single',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : req.session.user.userType
  });
}


exports.getEvents = (req,res,next) => {
  res.render('events',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : req.session.user.userType
  });
}

exports.getContact = (req,res,next) => {
  res.render('contact',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : req.session.user.userType
  });
}

exports.getClubsSingle = (req,res,next) => {
  res.render('club-single',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : req.session.user.userType
  });
}

exports.getAbout = (req,res,next) => {
  res.render('about',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : req.session.user.userType
  });
}

exports.getProfile = (req,res,next) => {

  res.render('profile',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : req.session.user.userType,
    nameFirst:req.session.user.profile.firstName,
    nameLast : req.session.user.profile.lastName,
  });
  
  
}
