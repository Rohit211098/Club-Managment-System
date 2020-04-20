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
      });
    }
     
  }