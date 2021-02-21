// import Router
const { Router } = require('express');
const isAuth = require('../middlewares/isAuth');

// initialize router
const router = Router();

// import isUser middleware
const isGuest = require('../middlewares/isGuest');

const authService = require('../services/authService');

router.get('/', isAuth, async (req, res, next) => {
    const users = await authService.getOne(req.user._id);
    let user = users[0];
    
    const userExpenses = user.expenses;
    let totalExpenses = 0;
    userExpenses.forEach(x => totalExpenses += Number(x.total));

    user.totalExpenses = totalExpenses;

    res.render('account-info', { title: 'Account Info', user });
});

module.exports = router;