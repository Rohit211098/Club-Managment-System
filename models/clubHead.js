const mongoose = require('mongoose');

const schema = mongoose.Schema;

const clubHead = new schema({

    name : {
        first : {
            type : String,
            require : true
        },

        last : {
            type : String,
            require : true
        }
    },

    email : {
        type : String,
        require : true,
        unique : true
    },

    profile:{

    
        birth_date:{
            type:String,
            required:false
        },

        phone_number:[{
            primary_number:{
                type:Number,
                required:false
                
            },
            alternate_number:{
                type:Number,
                required:false
            },

                is_verify:[{
                    primary_number:{ type:Boolean,
                        required:false},
                    alternate_number:{type:Boolean,
                        required:false}
                }]
        }],

        college:{
            college_code:{
                type:Number,
                required:false
            },
            course_name:{
                type:String,
                required:false
            },
            branch_name:{
                type:String,
                required:false
            },
            position:{
                type:Number,
                required:false
            },
        },

        address:{
            text_address:{
                type:String,
                required:false
            },
            state:{
                type:String,
                required:false
            },
            city:{
                type:String,
                required:false
            },
            pincode:{
                type:Number,
                required:false
            }
        },

        social_media:{

            facebook:{
                type:String,
                required:false
            },
            twitter:{
                type:String,
                required:false
            }
        },

        is_verify:[{
            email:{ type:Boolean,
                required:false}
        }] 
    },

    

})

module.exports = mongoose.model('ClubHead',clubHead);