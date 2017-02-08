// this file contains the public routes
'use strict';
// require the fs module to load the contacts.json file
const fs = require('fs');
const path = require('path');
// the SMS model, using ES6 destructuring  
const {SMS} = require('../models/sms');

// require the filesystem module to load custom contacts.json file

module.exports = (app) => {
    app.get('/', (req, res) => {
        // load the contact.son file 
        // using fileSync because we dont want to proceed if 
        // file is not found
        try{
            // file name 
            let dataFile = path.join(__dirname, '../db/contacts.json');
            // read the data
            let data = fs.readFileSync(dataFile, 'utf-8');
            res.send(data);
            
        } catch (err) {
            console.log(err);
            res.send('err');
        }
    })

    app.get('/contacts', (req, res) => {
        res.send('all contacts');
    });

    app.get('/contacts/details/:id', (req, res) => {
        let id = req.params.id;
        res.send('contact detail of id ' + id);
    });

    app.get('/compose', (req, res) => {
        res.send('send new message');
    });

    app.get('/sent', (req, res) => {
        res.send('all the sent messages here');
    })

    app.get('/sent/details/:id', (req, res) => {
        let id = req.params.id;
        res.send('sent details  of message id : ' + id);
    });
};