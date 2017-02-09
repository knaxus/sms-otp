// the model to store the sent sms
// require mongoose 

const mongoose = require('mongoose');
const validator = require('validator');

let SMSSchema = new mongoose.Schema({
    recepientName : {
        type : String,
        minlength : 5,
        trim : true,
        required : true
    },
    to : {
        // type : String,
        // maxlength : 11,
        // minlength : 11,
        // trim : true,
        // validate : {
        //     validator : validator.isNumeric,
        //     message : '{value} is invalid mobile number'
        // },
        type: Number,
        validate: {
            validator: function(v) {
                return /^\d{12}$/.test(v);
            },
            message: '{VALUE} is not a valid mobile number!'
        },
        required : true
    },
    from : {
        type: Number,
        validate: {
            validator: function(v) {
                return /^\d{11}$/.test(v);
            },
            message: '{VALUE} is not a valid mobile number!'
        },
        required : true
    },
    otp : {
        type : Number,
        validate: {
            validator: function(v) {
                return /^\d{6}$/.test(v);
            },
            message: '{VALUE} is not a valid 6 digit otp!'
        },
        required : true
    },
    body : {
        type : String,
        minlength : 22,
        maxlength : 100,
        required : true
    },
    _sentAt : {
        type : Number,
        required : true
    },
    status : {
        type : Number,
        validate: {
            validator: function(v) {
                return /^\d{3}$/.test(v);
            },
            message: '{VALUE} is not a valid status code!'
        },
        required : true
    }
});

let SMS = mongoose.model('SMS', SMSSchema);
module.exports = {SMS};
