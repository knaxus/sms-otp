// this file contains the public routes
'use strict';

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('welcome');
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