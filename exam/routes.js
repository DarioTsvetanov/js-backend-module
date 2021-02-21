// import Router
const { Router } = require('express');

// initialize router
const router = Router();

// import home controller
const homeController = require('./controllers/homeController');

// import auth controller
const authController = require('./controllers/authController');

// import expense controller
const expenseController = require('./controllers/expenseController');

// import user controller
const userController = require('./controllers/userController');

// use home controller on endpoint /
router.use('/', homeController);

// use auth controller on endpoint /auth
router.use('/auth', authController);

// use expense controller on endpoin /expense
router.use('/expense', expenseController);

// use user controller on endpoin /user
router.use('/profile', userController);

router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
})

// export router
module.exports = router;