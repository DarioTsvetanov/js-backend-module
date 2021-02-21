// import Router
const { Router } = require('express');

// initialize router
const router = Router();

// import isAuthenticated middleware
const isAuth = require('../middlewares/isAuth');

// import expense service
const expenseService = require('../services/expenseService');

// on GET method
router.get('/', async (req, res, next) => {
    try {
        if (!req.user) return res.render('home', { title: 'Home Page' });

        const user = await expenseService.getAll(req.user._id);
        
        if (!user.expenses) return res.render('home', { title: 'Home Page' });

        res.render('home', { title: 'Home Page', expenses: user.expenses });
    }
    catch(e) {
        next(e);
    }
});

// export router
module.exports = router;