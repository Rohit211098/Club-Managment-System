const mongoose = require('mongoose');

const schema = mongoose.Schema;

const newsSchema = new schema({

   Type : {
       type : String,
       required : true
   },

   Heading : {
    type : String,
    required : true,
    unique : true
    },

   description : {
       short : {
        type : String,
        required :true
       },
       full :{
        type : String,
        required :true
       }
       
   },

   EventInfo : {
       EventId : {
           type :String,
       },
       ClubId : {
           type : String
       }
   },


   images : [{
       type : String
   }],


   PublishedBy : {
       type : String
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
       },

       time : {
           type :String,
           require : true
       }
   },


})

module.exports = mongoose.model('News',newsSchema);