// import Router
const { Router } = require('express');

// initialize router
const router = Router();

// import expense service
const expenseService = require('../services/expenseService');

// import is authenticated middleware 
const isAuth = require('../middlewares/isAuth');

router.get('/create', isAuth, async (req, res) => {
    res.render('create', { title: 'Create Expense' });
});

router.post('/create', isAuth, async (req, res, next) => {
    try {
        const user = req.user._id;

        await expenseService.create(req.body, user);
        
        res.redirect('/');
    }
    catch(e) {
        next(e);
    }
});

router.get('/:expenseId/report', isAuth, async (req, res, next) => {
    try {
        const expenses = await expenseService.getOne(req.params.expenseId);
        const expense = expenses[0];

        res.render('report', { title: 'Expense Report', expense });
    }
    catch(e) {
        next(e);
    }
});

router.get('/:expenseId/delete', isAuth, async (req, res, next) => {
    try {
        await expenseService.remove(req.params.expenseId);

        res.redirect('/');
    }
    catch(e) {
        next(e);
    }
});

router.post('/refill', isAuth, async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { amount } = req.body;

        await expenseService.refillAmount(userId, amount);

        res.redirect('/');
    }
    catch(e) {
        next(e);
    }
});

// export router
module.exports = router;