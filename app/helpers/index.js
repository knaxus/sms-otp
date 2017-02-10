'use strict';
const path      = require('path');
const fs        = require('fs');
const configs   = require('../configs');
const mongoose  = require('../db');
// the SMS model, using ES6 destructuring  
const {SMS}     = require('../models/sms');


let getAllContacts = (fileName) => {
    try{
            // using fileSync because we dont want to proceed if 
            // file is not found 
            let dataFile = path.join(__dirname, '../db/' + fileName);
            //console.log('data file = ', dataFile);
            // read the data and parse it to JSON
            let data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
            //res.send(data);
            return data;
            
        } catch (err) {
            console.log(err);
            return null;
        }
}

let getPerson = (mobile) => {
    // fetch the data 
    let data = getAllContacts('contacts.json');
    if(data) {
        if(data.contacts) {
            // if the file is found, filter out the details
            let person = data.contacts.filter((el) => parseInt(el.mobile) === parseInt(mobile));
            //console.log('person arr = ', person);
            if(person.length === 1) {
                return person[0];
            }
            else {              
                return {
                    code : '404p' // person not found
                };
            }
        } 
    }
    else {
        return {
            code : '404f' // file not found
        };
    }

}

let getRandomInt = (min=100000, max=1000000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let saveSMSInDB = (sms, details, cb) => {

    let message = {
        name : details.name,
        mobile : details.mobile,   
        success : {
            msg : ''
        }, 
    };

    sms.save().then((sms) => {
        message.success.msg = 'sent message saved successfully';        
        //console.log(message.success.msg);
        cb(message);            
        
    }, (err) => {
        console.log('***DB Insertion ERROR\n', err);
        if(err.errors.recepientName) {
            message.err = 'Please check the contact name!';            
            console.log(message.err);
            cb(message);                
            
        }else if (err.errors.to) {
            message.err = 'Check the \'sending to\' number';            
            console.log(message.err);
            cb(message);                      
        }
        else if (err.errors.from) {
            message.err = 'Check the \'sending from\' number';            
            console.log(message.err);
            cb(message);                
        }
        else if (err.errors.otp) {
            message.err = 'Check the otp is valid or not';            
            console.log(message.err);
            cb(message);                
        }
        else if (err.errors.body) {
            message.err = 'check the message body';            
            console.log(message.err);
            cb(message);                
        }
        else if(err.errors._sentAt) {
            message.err = 'Please specify the time of sending message';            
            console.log(message.err);
            cb(message);                
        }
        else if(err.errors.status) {
            message.err = 'Please specify the message status code';            
            console.log(message.err);
            cb(message);                
        }
        else {
            message.err = 'Something is broken';            
            console.log(message.err);
            cb(message);    
            
        }
    });
}

module.exports = { 
    getAllContacts, 
    getPerson, 
    getRandomInt,
    saveSMSInDB 
};