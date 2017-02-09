'use strict'
const configs = require('../configs');
const mongoose = require('../db');
const fs = require('fs');
// the SMS model, using ES6 destructuring  
const {SMS} = require('../models/sms');

let sms = new SMS({
    senderName : 'As',
    to : 9006781316,
    from : 8826624872,
    body : 'Hello this is a simple test to see the data saving',
    _sentAt : new Date().getTime()
});

sms.save().then((sms) => {
    console.log('successful : \n', sms);
}).then(() => {
    console.log('\nsave is complete')
}).catch((err) => {
    if (err.name === 'ValidationError') {
        err =  JSON.stringify(err, undefined, 2);        
        console.log('There are validation errors\n***\n', err);
        fs.writeFileSync('error.json', err);        
    }
    else {
        err =  JSON.stringify(err, undefined, 2);
        fs.writeFileSync('error.json', err);
        console.log('*****ERROR****\n\n', err);
    }
});