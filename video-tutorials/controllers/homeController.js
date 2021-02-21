// import Router
const { Router } = require('express');

// initialize router
const router = Router();

// import isAuthenticated middleware
const isAuth = require('../middlewares/isAuth');

// import course service
const courseService = require('../services/courseService');

// on GET method
router.get('/', async (req, res, next) => {
    try {
        let courses;

        if (req.user) {
            courses = await courseService.getAll(req.query.searchQuery);
            courses = courses.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        }
        else {
            courses = await courseService.getAll();
            courses = courses.sort((a, b) => b.usersEnrolled.length - a.usersEnrolled.length);
            
            if (courses.length > 3) courses.length = 3;
        }

        res.render('home', { title: 'Home Page', courses });
    }
    catch(e) {
        next(e);
    }
});

// export router
module.exports = router;