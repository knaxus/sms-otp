'use strict';
// load configs at first 
const configs       = require('./configs');
let port            = process.env.PORT || 3000;

// import the npm and node modules here 
const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const ejs           = require('ejs');

// create the app
const app = express();

// middlewares here
app.use(bodyParser.urlencoded( {extended : true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/_public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

// custom modules 
const mongoose      = require('./db');
const publicRoutes  = require('./routes/public')(app);

app.listen(port, () => {
    console.log('app started and listening to port ', port);
})

// we need to export the 'app' for testing purpose
module.exports = {app};