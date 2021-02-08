const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

const sessionData = {};
const session = () => {
    return (req, res, next) => {
        if (!req.cookies.id) {
            let cookieId = uniqid();

            sessionData[cookieId] = {};

            res.cookie('id', cookieId);
            req.session = {};
        }
        else {
            let cookieId = req.cookies.id;
            req.session = sessionData[cookieId];
        }

        next();
    }
}

app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.get('/register/:username/:password', (req, res) => {
    let password = req.params.password;
    req.session.username = req.params.username;
    
    bcrypt.genSalt(9, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            req.session.hashedPassword = hash;
        })
    })

    res.send('You have logged!');
});

app.get('/', (req, res) => {
    // console.log(req.session);
    res.send(`<h1>Hello ${req.session?.username || 'n\\a'}</h1>`);
});

app.get('/login/:password', (req, res) => {
    bcrypt.compare(req.params.password, req.session.hashedPassword, (err, result) => {
        res.send(`<h1>${result ? 'Password match' : 'Password Invalid'}</h1>`);
    });
});

app.listen(port, () => console.log(`Listening to port ${port}...`));