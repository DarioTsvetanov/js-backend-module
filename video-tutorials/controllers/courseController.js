// import Router
const { Router } = require('express');

// initialize router
const router = Router();

// import course service
const courseService = require('../services/courseService');

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Course' });
});

router.post('/create', async (req, res, next) => {
    try {
        const creator = req.user._id

        await courseService.create(req.body, creator);

        res.redirect('/');
    }
    catch(e) {
        next(e);
    }
});

router.get('/:courseId/details', async (req, res, next) => {
    try {
        const courses = await courseService.getOne(req.params.courseId);
        const course = courses[0];

        const userId = req.user._id;

        // check if current user is creator
        if (course.creator == userId) res.render('details', { title: 'Details', course, isCreator: true });
        else {
            const isEnrolled = await courseService.isEnrolled(course, userId);

            if (isEnrolled) res.render('details', { title: 'Details', course, isEnrolled: true });
            else {
                res.render('details', { title: 'Details', course });
            }
        }
    }
    catch(e) {
        next(e);
    }
});

router.get('/:courseId/enroll', async (req, res, next) => {
    try {
        const result = await courseService.enroll(req.params.courseId, req.user._id);

        // console.log(result);

        res.redirect(`/course/${req.params.courseId}/details`);
    }
    catch(e) {
        next(e);
    }
});

router.get('/:courseId/edit', async (req, res, next) => {
    try {
        const courses = await courseService.getOne(req.params.courseId);
        const course = courses[0];

        res.render('edit', { title: 'Details Page', course });
    }
    catch(e) {
        next(e);
    }
});

router.post('/:courseId/edit', async (req, res, next) => {
    try {
        await courseService.edit(req.params.courseId, req.body);

        res.redirect(`/course/${req.params.courseId}/details`);
    }
    catch(e) {
        next(e);
    }
});

router.get('/:courseId/delete', async (req, res, next) => {
    try {
        await courseService.remove(req.params.courseId);

        res.redirect('/');
    }
    catch(e) {
        next(e);
    }
});

// export router
module.exports = router;