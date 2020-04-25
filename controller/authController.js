const User = require('../models/user');
const bcryppt = require('bcryptjs');

exports.getSignUpDetails = (req,res,next) =>{
    const rollNumber = req.body.signupRollNo;
    const firstName = req.body.signupFirstName;
    const lastName = req.body.signupLastName;
    const email = req.body.signupEmail;
    const password = req.body.signupPassword;
    const userName = req.body.signupUserName;
    var passwordEncrypt = bcryppt.hash(password,12).then( message => {
        const user = new User({
            rollNumber:rollNumber,
            email:email,
            userName : userName,
            userType:0,
            isAdmin:false,
            profile : {
                firstName:firstName,
                lastName:lastName
            },
            password:message
        });

    

        user.save().then( message => {
            console.log(message);
            res.redirect('/#loginModal');
        }).catch( err =>{
            console.log(err);
            res.redirect('/#signupModal');
        });
        
    }).catch(err =>{
        console.log(err);
    });

    
}


exports.getlogindetails = (req,res,next) =>{

    const rollNumber = parseInt(req.body.loginRollNo); 
    const password = req.body.loginPassword;

    User.findOne({rollNumber:rollNumber}).then(user => {
        if(!user){
            res.redirect('/#loginModal');
        }

        console.log("======================== "+rollNumber+"++++++++++++++++"+password);

        bcryppt.compare(password,user.password).then( result => {
            if(result){
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
                
            }else{
                res.redirect('/#loginModal');
            }
           
        }).catch(err => {
            console.log("bcrypt   err "+err);
        });
    }).catch(err => {
        console.log("user err++++"+err);
    });
  
}


exports.postLogout = (req,res,next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
      });
}

