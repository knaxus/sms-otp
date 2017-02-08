// the model to store the sent sms
// require mongoose 

const mongoose = require('mongoose');
const validator = require('validator');

let SMSSchema = new mongoose.Schema({
    senderName : {
        type : String,
        minlength : 5,
        trim : true,
        required : true
    },
    to : {
        // type : String,
        // maxlength : 10,
        // minlength : 10,
        // trim : true,
        // validate : {
        //     validator : validator.isNumeric,
        //     message : '{value} is invalid mobile number'
        // },
        type: Number,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        },
        required : true
    },
    from : {
        type: Number,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        },
        required : true
    },
    body : {
        type : String,
        minlength : 22,
        required : true
    },
    _sentAt : {
        type : Number,
        required : true
    }
});

let SMS = mongoose.model('SMS', SMSSchema);
module.exports = {SMS};
