// import Router
const { Router } = require('express');

// initialize router
const router = Router();

// import authentication service
const authService = require('../services/authService');

// import cookie name 
const { COOKIE_NAME } = require('../config/config');

// use on action /register and method GET
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

// use on action /register and method POST
router.post('/register', async (req, res, next) => {
    try {
        // deconstruct request body
        const { username, password, rePassword } = req.body;

        // invoke register service
        await authService.register(username, password, rePassword);
        
        // log in user
        const token = await authService.login(username, password);

        // set token in cookie
        res.cookie(COOKIE_NAME, token, { httpOnly: true });

        // redirect
        res.redirect('/');
    }
    catch(e) {
        // in case of error invoke error handler
        next(e);
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', async (req, res, next) => {
    try {
        // deconstruct request body
        const { username, password } = req.body;

        // invoke login service
        const token = await authService.login(username, password);
        
        // set token in cookie
        res.cookie(COOKIE_NAME, token, { httpOnly: true });

        // redirect
        res.redirect('/');
    }
    catch(e) {
        // in case of error invoke error handler
        next(e);
    }
})

router.get('/logout', (req, res) => {
    // clear token cookie
    res.clearCookie('token');

    // redirect
    res.redirect('/');
});

// export router
module.exports = router;