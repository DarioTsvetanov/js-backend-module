// import Router
const { Router } = require('express');

// initialize router
const router = Router();

// import home controller
const homeController = require('./controllers/homeController');

// import auth controller
const authController = require('./controllers/authController');

// use home controller on endpoint /
router.use('/', homeController);

// use auth controller on endpoint /auth
router.use('/auth', authController);

// export router
module.exports = router;