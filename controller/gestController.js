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
       clubs : clubs,
       errorMessage : checkError(req)
        
      });
  
    }else{
      res.render('clubs',{
      isAuthenticated: req.session.isLoggedIn, 
      clubs : clubs ,
      errorMessage : checkError(req) 
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
      userType : getUserType(req),
      errorMessage : checkError(req)
    
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

    let cordintor = []

    for(i in event.cordinators){
      // console.log()
      User.findOne({email : event.cordinators[i] },(error,user) => {
          return new Promise(user => {})
      }).then(user => {
       

        cordintor.push(user) ;
        
        
      })
    }
    console.log(cordintor)
    

   
    
    res.render('event-single',{
      isAuthenticated: req.session.isLoggedIn,
      isAdmin : checKAdmin(req),
      userType : getUserType(req),
      event : event,
      errorMessage : checkError(req)
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
      events : events,
      errorMessage : checkError(req)
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

     

      res.render('club-single',{
        isAuthenticated: req.session.isLoggedIn,
        isAdmin : checKAdmin(req),
        userType : getUserType(req),
        club : club,
        head : head,
        errorMessage : checkError(req)
      });
  

    }).catch(error => {

      console.log(error)

    })

    
  }).catch(error => {

    console.log(error)

  })
  
}


exports.getAbout = (req,res,next) => {
  res.render('about',{
    isAuthenticated: req.session.isLoggedIn,
    isAdmin : checKAdmin(req),
    userType : getUserType(req),
    errorMessage : checkError(req)
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
            club : club,
            errorMessage : checkError(req)
            
          });
  
        })

      }else{
        res.render('faculty-profile',{
          isAuthenticated: req.session.isLoggedIn,
          isAdmin : checKAdmin(req),
          userType : getUserType(req),
          user : user,
          errorMessage : checkError(req)
    
          
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


 
  console.log( update)


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


function checkError(req){
  let message = req.flash('error');
  if(message.length > 0){
    message = message[0];
  }else{
    message = null;
  }
  return message;
}
