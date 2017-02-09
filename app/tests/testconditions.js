'use strict'
const configs = require('../configs');
const mongoose = require('../db');
const helpers = require('../helpers');
const fs = require('fs');
// the SMS model, using ES6 destructuring  
const {SMS} = require('../models/sms');

let sms = new SMS({
    recepientName : 'Ashok',
    to : 9006781316,
    from : 8826624872,
    body : 'Hello this is a simple test to see the data saving',
    _sentAt : new Date().getTime()
});

let sms2 = new SMS({
    recepientName : 'Ashok Dey',
    to : parseInt('+918826624872'),
    from : parseInt('+14707983806'),
    otp : 123435,
    body : 'Hello Your OTP is : 123432',
    _sentAt : new Date().getTime()
});

//console.log('sms2 => ',sms2);

// sms.save().then((sms) => {
//     console.log('successful : \n', sms);
// }).then(() => {
//     console.log('\n**Save is complete')
// }).catch((err) => {
//     if(err.errors.senderName) {
//         console.log('Please check the contact name!')
//     }else if (err.errors.to) {
//         console.log('Check the sending to number');
//     }
//     else if (err.errors.from) {
//         console.log('Check the sending from number');
//     }
//     else if (err.errors.otp) {
//         console.log('Check the otp is valid or not');
//     }
//     else if (err.errors.body) {
//         console.log('check the message body');
//     }
//     else if(err.errors._sentAt) {
//         console.log('PLease specify the time of sending message');
//     }
//     else {
//         console.log('Something is broken');
//     }
// });

helpers.saveSMSInDB(sms2, (msg) => {
    console.log(msg);
});
