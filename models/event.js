const mongoose = require('mongoose');

const schema = mongoose.Schema;

const eventSchema = new schema({

   heading : {
       type : String,
       required : true,
       unique :  true
   },

   description : {
       type : String,
       required :true
   },

   date : {
       type :String,
       required : true
   },

   time: {
       type : String ,
       required : true
   },

   images : {
       bigBanner : {
           type : String,
           require : true
       },

       smallBanner : {
           type : String,
           require : true
       }
   },

   location : {
       type : String,
       require : true
   },

   cordinators : [{
       type : String
   }],

   fees : {
        type : Number,
        required :  true
   },

   createdBy : {
       email : {
           type : String ,
           require :true
       },

       id : {
            type : String,
            require : true
       },

       date : {
            type : String,
            require : true
       }
   }




   

})

module.exports = mongoose.model('Event',eventSchema);