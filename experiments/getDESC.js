'use strict'
const configs = require('../configs');
const mongoose = require('../db');
const helpers = require('../helpers');
const {SMS} = require('../models/sms');

SMS.find({}, null, { sort : { _sentAt : -1 }}).then((allSMS) => {
    //console.log('****All SMSes***\n', allSMS);
    allSMS.forEach((sms) => {
        console.log(`*** Name : ${sms.recepientName} | OTP Sent : ${sms.otp}  | Time : ${new Date(sms._sentAt).toString()}`);
    });

}, (err) => {
    
    console.log(err);
});
