// import Router
const { Router } = require('express');

// initialize router
const router = Router();

// import authentication service
const authService = require('../services/authService');

// import cookie name 
const { COOKIE_NAME } = require('../config/config');

// import isUser middleware
const isGuest = require('../middlewares/isGuest');

// use on action /register and method GET
router.get('/register', isGuest, (req, res) => {
    res.render('register', { title: 'Register Page' });
});

// use on action /register and method POST
router.post('/register', isGuest, async (req, res, next) => {
    try {
        // deconstruct request body
        const { username, password, repeatPassword, amount } = req.body;
        
        // invoke register service
        await authService.register(username, password, repeatPassword, amount);
        
        const token = await authService.login(username, password);

        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        
        res.redirect('/');
    }
    catch(e) {
        // in case of error invoke error handler
        next(e);
    }
});

router.get('/login', isGuest, (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', isGuest, async (req, res, next) => {
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