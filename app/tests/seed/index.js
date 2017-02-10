'use strict'

const {ObjectID}    = require('mongodb');
const {SMS}         = require('../../models/sms');

// creae ids for the sms
const smsId = new ObjectID();

// the dummy data array 
const dummySMS = [
    {   
        _id : smsId,
        recepientName : 'Ashok Dey',
        to : 919889987898,
        from : 12343234543,
        otp : 123432,
        body : 'This is your OTP : 213435',
        _sentAt : new Date().getTime(),
        status : 200
    }
]

// the function to populate the data 
const populateSMS = (done) => {
    SMS.remove({}).then(() => {
        return SMS.insertMany(dummySMS);
    }).then(() => { 
        done();
    })
};

module.exports = {
    dummySMS,
    populateSMS
};