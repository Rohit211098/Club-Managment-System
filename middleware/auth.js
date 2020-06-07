const Faculty = require('../models/faculty')

exports.getAuth  = (req,res,next) => {
    if(!req.session.isLoggedIn){
        return res.redirect("/#loginModal")
    }
    next();

}

exports.getIsHead  = (req,res,next) => {

    if(req.session.user.userType != 10){
        return res.redirect("/#loginModal")
    }
    next();

}
