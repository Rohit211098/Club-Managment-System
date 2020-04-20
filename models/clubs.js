const mongoose = require('mongoose');

const schema = mongoose.Schema;

const clubSchema = new schema({

    clubName : {
        type : String,
        required : true,
        unique : true

    },

    clubHead : {

        name : {
            type : String,
        
        },

        email : {
            type : String,
            require : true
        },

        phone : {
            type : Number,
        }


    },

    clubImagePath : {
        type :String,
        require : true

    },

    clubDescription : {
        type : String,
        require : true

    }

})

module.exports = mongoose.model('Club',clubSchema);