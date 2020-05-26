const User = require('../models/user');
const Faculty = require('../models/faculty');
const bcryppt = require('bcryptjs');

exports.getSignUpDetails = (req,res,next) =>{
    const rollNumber = req.body.signupRollNo;
    const firstName = req.body.signupFirstName;
    const lastName = req.body.signupLastName;
    const email = req.body.signupEmail;
    const password = req.body.signupPassword;
    const userName = req.body.signupUserName;
    const gender = req.body.gender;

    var passwordEncrypt = bcryppt.hash(password,12).then( message => {
        const user = new User({
            rollNumber:rollNumber,
            email:email,
            userName : userName,
            userType:0,
            isAdmin:false,
            profile : {
                gender: gender,
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
            errorHandeler(req,err);
            res.redirect('/#signupModal');
        });
        
    }).catch(err =>{
        console.log(err);
    });

    
}


exports.getSignUpFacultyDetails = (req,res,next) =>{
    const firstName = req.body.signupFirstName;
    const lastName = req.body.signupLastName;
    const email = req.body.signupEmail;
    const password = req.body.signupPassword;
    const userName = req.body.signupUserName;
    const gender = req.body.gender;

    var passwordEncrypt = bcryppt.hash(password,12).then( message => {
        const faculty = new Faculty({
            name : {
                first : firstName,
                last : lastName,
            },
            email:email,
            userName : userName,
            userType:9,
            isAdmin:false,
            profile : {
                gender : gender
            },
           
            password:message
        });

    

        faculty.save().then( message => {
            console.log(message);
           
            res.redirect('/#loginHeadModal');
        }).catch( err =>{
            console.log(err);
            errorHandeler(req,err)
            res.redirect('/#signupModalFaculty');
        });
        
    }).catch(err =>{
        console.log(err);
    });

    
}


exports.getlogindetails = (req,res,next) =>{

    const rollNumber = parseInt(req.body.loginRollNo); 
    const password = req.body.loginPassword;

    User.findOne({rollNumber:rollNumber}).then(userDetails => {
        if(!userDetails){
            req.flash('error','Invalid Credentials')
            return res.redirect('/#loginModal');
        }

        const user = {
            isAdmin : userDetails.isAdmin,
            userType : userDetails.userType,
            userId: userDetails._id
        }
        console.log("======================== "+rollNumber+"++++++++++++++++"+password+"  "+user.userId);

        bcryppt.compare(password,userDetails.password).then( result => {
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


function errorHandeler(req,error){

    if(error.code == 11000){
        if(error.keyValue.hasOwnProperty("userName") ){
            req.flash('error',"User Name Already Exists !! ");
        }else if(error.keyValue.hasOwnProperty("email")){
            req.flash('error',"Email Already Exists !! ");
        }else if(error.keyValue.hasOwnProperty("rollNumber")){
            req.flash('error',"RollNumber Already Exists !! ");
        }else{
            req.flash('error',"Error "+error.errmsg);
        }
        
    }


}

