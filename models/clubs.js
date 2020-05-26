const mongoose = require('mongoose');

const schema = mongoose.Schema;

const clubSchema = new schema({

    clubName : {
        type : String,
        required : true,
        unique : true

    },

    clubDate : {
        type : String
    },

    clubHead : {
        type: String,
        require : true
    },

    clubImagePath : {
        type :String,
        require : true

    },

    clubImageBig : {
        type :String,
        require : true

    },

    clubDescription : {
        type : String,
        require : true

    },

    clubBenefits : [],

    

    clubMembers : [],

    clubEvents : []

})

module.exports = mongoose.model('Club',clubSchema);