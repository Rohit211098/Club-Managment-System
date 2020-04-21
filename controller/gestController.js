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


exports.getIndex = (req,res,next) => {

  var isAdmin = false;

  if (req.session.isLoggedIn) {
    if(req.session.user.isAdmin){
       isAdmin = true;
      }
    }
  

  Clubs.find({}).limit(3).exec( (err, clubs) => {
    res.render('index',{
      isAuthenticated: req.session.isLoggedIn,
      isAdmin : isAdmin,
      clubs : clubs
    
    });
    
  })
}