// import express
const express = require('express');

// import express-handlebars
const hbs = require('express-handlebars');

// import cookie parser
const cookieParser = require('cookie-parser');

// import authentication middleware
const auth = require('../middlewares/auth');

module.exports = (app) => {
    // declare hbs engine
    app.engine('hbs', hbs({
        extname: 'hbs',
    }));

    // set view engine
    app.set('view engine', 'hbs');

    // allow access to public folder
    app.use('/static', express.static('public'));

    // allow form to be parsed
    app.use(express.urlencoded({
        extended: true
    }));

    // allow parsing json
    app.use(express.json());

    // use cookie parser
    app.use(cookieParser());

    // use authentication method
    app.use(auth);
};