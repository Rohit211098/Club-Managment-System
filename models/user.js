const mongoos = require('mongoose');

const Schema = mongoos.Schema;

const userSchema = new Schema({

    rollNumber: {
        type: Number,
        required:true,
        unique: true,
        dropDups: true

    },

    userName : {
        type: String,
        required:true,
        unique: true,
        dropDups: true
    },

    email: {
        type: String,
        required:true,
        unique: true,
        dropDups: true

    },

    isAdmin:{
        type:Boolean,
        required: true

    },

    userType: {
        type: Number,
        required: true
    },

    clubsEnrolled : [],

    clubsRejected : [],

    clubApplied : [],

    profile:{

        firstName: {
            type: String,
            required:true,
        },
    
        lastName : {
            type: String,
            required:true,
        },

        gender : {
            type : String,
            require : true
        },

        profileImage : {
            type : String
        },

        birth_date:{
            type:String,
            required:false
        },

        Biography : {
            type :String
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

            college_name:{
                type:String,
                required:false
            },

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
            semester:{
                type:Number,
                required:false,
                
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
    password: {
        type: String,
        required:true,
    }
});

module.exports = mongoos.model('User',userSchema);