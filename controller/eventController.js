const Clubs = require('../models/clubs')
const Events = require('../models/event')
const User = require('../models/user')
const Faculty = require('../models/faculty')


exports.postRegisterEvent = (req,res,next) => {

    
    const clubId = req.query.clubId
    const eventId = req.query.eventId

    
    User.findById({_id : req.session.user.userId},(error , user) => {
        if(!error){
            // console.log(user.profile.college == '{}')
            if(user.profile.college == '{}'  ){
                return res.send('0');
            }else{
                return res.send('1');
            }
        }
    })
   

    // Faculty.findOneAndUpdate({_id: req.session.user.userId},update,function (error,doc) {
    //     if (error){
    //       console.log(error)
    //       return res.send(400, {error: error});
          
    //     }
    //     return res.send(data);
    
    //   });



}