// this file contains the public routes
'use strict';
// require the fs module to load the contacts.json file
const credentials = require('../configs/credentials.json');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const twilioClient = require('twilio')(credentials.sid, credentials.token);
// the SMS model, using ES6 destructuring  
const {SMS} = require('../models/sms');
const helpers = require('../helpers');

// require the filesystem module to load custom contacts.json file

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.redirect('/contacts');
    });

    // all the contacts are displayed here 
    app.get('/contacts', (req, res) => {
        // load the contact.son file
        let data = helpers.getAllContacts('contacts.json');
        if(data) {
            res.render('home', {data});
        }
        else {
            res.render('home', {
                err : 'No data found !'
            });
        }
    });

    // route to view the contact details
    app.get('/contacts/details/:mob', (req, res) => {
        let mob = req.params.mob;
        // get the person using the mobile number 
        let result = helpers.getPerson(mob);
        //console.log(result);

        if(parseInt(result.mobile) === parseInt(mob)) {
            res.render('details', {data : result});
        }
        else if (result.code === '404p') {
            res.render('details', {
                err : `No person found with mobile number ${mob} !`
            });
        }
        else {
            res.render('details', {
                err : 'Failed to load data or invalid mobile number provided !'
            });
        }
    });

    // route to compose a message 
    app.get('/compose/:mob', (req, res) => {
        
        let mobile = req.params.mob;
        let person = helpers.getPerson(mobile);
        person.otp = helpers.getRandomInt();
        res.render('compose', {data : person });
    });

    // route to send and save the SMS 
    app.post('/compose', (req, res) => {
        let data = _.pick(req.body, ['mobile', 'otp', 'message', 'time' ]);
        // get the detail of the person and store the message in DB
        let person = helpers.getPerson(data.mobile);        
        // try to send the SMS
        twilioClient.sendMessage({
            to : data.mobile,
            from : credentials.phone,
            body : data.message
        }, (err, message) => {
            if(err) {
                console.log('Twilio Error => ', err);
                let emsg = 'Unable to connect to Twilio API!';
                if(err.code === 21608) {
                    emsg = 'Twilio denied sending the message'
                }
                let result = {
                    name : person.name,
                    mobile : person.mobile,
                    err : emsg
                }
                return res.render('sentResponse', {data : result });
            }

            // create the sms data to store in DB
            let sms = new SMS({
                recepientName : person.name,
                to : person.mobile,
                from : parseInt(credentials.phone),
                otp : data.otp,
                body : data.message,
                _sentAt : new Date().getTime(),
                status : 200 // can use message.status
            });

            console.log('message sent to Twilio API');
            // save the data using a helper function 
            helpers.saveSMSInDB(sms, {name : person.name, mobile : person.mobile}, (result) => {
                if(result.err) {
                    res.render('sentResponse', {data : result});
                }
                else {
                    result.success.msg = `Message sent to ${result.name} successfullly and saved to sent items`;
                    res.render('sentResponse', {data : result});
                }
            });
            
        });
    });

    // route to view all the sent messages
    app.get('/sent', (req, res) => {
        // get the sent messages from DB inDESC order 
        
        SMS.find({}, null, { sort : { _sentAt : -1 }}).then((allSMS) => {
            //console.log('****All SMSes***\n', allSMS);
            res.render('sentMessages', {data : allSMS});
        }, (err) => {
            console.log(err);
            res.send('all the sent messages here');
        });
        
    })

    // route to check the details of sent messages 
    app.get('/sent/details/:id', (req, res) => {
        let id = req.params.id;
        //fetch the sms using the id 
        SMS.findById(id).then((sms) => {
            res.send({sms});
        }, (err) => {
            console.log(err);
        });
        res.send('sent details  of message id : ' + id);
    });

    // display the 404 page
    app.get('/*', (req, res) => {
        res.render('404');
    });
};