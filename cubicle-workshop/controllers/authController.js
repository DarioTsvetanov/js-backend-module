const { Router } = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const router = Router();

const authService = require('../services/authService');

router.get('/register', isGuest, (req, res) => {
    res.render('registerPage', { title: 'Register Page' });
});

router.post('/register', isGuest, async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    try {
        await authService.register({ username, password, repeatPassword });

        res.redirect('/auth/login'); 
    }
    catch(errors) {
        res.render('registerPage', { title: 'Register Page', errors });
    }
});

router.get('/login', isGuest, (req, res) => {
    res.render('loginPage', { title: 'Login Page' });
});

router.post('/login', isGuest, async (req, res) => {
    try {
        let token = await authService.login(req.body);

        res.cookie('USER_SESSION', token);

        res.redirect('/products');
    }
    catch(error) {
        res.render('loginPage', { title: 'Login Page', error });
    }
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie('USER_SESSION')
    
    res.redirect('/auth/login');
});

module.exports = router;