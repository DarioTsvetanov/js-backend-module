// import Router
const { Router } = require('express');

// initialize router
const router = Router();

// import isAuthenticated middleware
const isAuth = require('../middlewares/isAuth');

// on GET method
router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

// export router
module.exports = router;