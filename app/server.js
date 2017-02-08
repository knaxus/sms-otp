'use strict';
// load configs at first 
const configs = require('./configs');
let port = process.env.PORT || 3000;

// import the npm and node modules here 
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

// create the app 
const app = express();

// custom modules 
const publicRoutes = require('./routes/public')(app);
const mongoose = require('./db');

// middlewares here
app.use(express.static(path.join(__dirname + '/_public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));


app.listen(port, () => {
    console.log('app stated and listening to port ', port);
})
