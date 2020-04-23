const Head = require('../models/clubHead');
const bcryppt = require('bcryptjs');

exports.getHeadlogindetails = (req,res,next) =>{

    const email = req.body.loginEmail; 
    const password = req.body.loginPassword;

    Head.findOne({email:email}).then(ClubHead => {
        if(!ClubHead){
            res.redirect('/about');
        }

        bcryppt.compare(password,ClubHead.password).then( result => {
            if(result){
                req.session.isLoggedIn = true;
                req.session.user = ClubHead;
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
        console.log("user err"+err);
    });
  
}