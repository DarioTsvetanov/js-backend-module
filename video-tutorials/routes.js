// import Router
const { Router } = require('express');

// initialize router
const router = Router();

// import home controller
const homeController = require('./controllers/homeController');

// import auth controller
const authController = require('./controllers/authController');

// import course controller
const courseController = require('./controllers/courseController');

// use home controller on endpoint /
router.use('/', homeController);

// use auth controller on endpoint /auth
router.use('/auth', authController);

// use course controller on endpoint /course
router.use('/course', courseController);

// export router
module.exports = router;