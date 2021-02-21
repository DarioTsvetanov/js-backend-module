// import course model
const Course = require('../models/Course');

// import auth service
const authService = require('./authService');

// import user model
const User = require('../models/User');

async function create(data, creator) {
    try {
        // validate
        if (data.title.length < 4) throw { message: 'The title should be at least 4 characters', pageTitle: 'Create Course', render: 'create' }

        if (data.description.length < 20) throw { message: 'The description should be at least 20 characters long', pageTitle: 'Create Course', render: 'create' }

        if (data.description.length > 50) throw { message: 'The description should be at less than 50 characters long', pageTitle: 'Create Course', render: 'create' }

        if (!data.imageUrl.startsWith('http', 'https')) throw { message: 'The imageUrl should starts with http or https', pageTitle: 'Create Course', render: 'create' }

        // search for existing user
        const existingCourse = await Course.find({title: data.title});

        if (existingCourse.length !== 0) throw { message: 'Course already exists!', pageTitle: 'Create Course', render: 'create' }

        // get instance of date
        const createdAt = new Date().toLocaleString();

        // create course by model
        const course = await new Course({...data, createdAt, creator});

        // save created course
        return course.save();
    }
    catch(e) {
        throw e;
    }
}

async function getAll(query) {
    let courses;

    if (query) {
        query = query.toLowerCase();
        courses = await Course.find().lean();
        courses = courses.filter(x => x.title.toLowerCase().includes(query));
    }
    else {
        courses = Course.find().lean();
    }

    return courses;
}

function getOne(_id) {
    return Course.find({_id}).lean();
}

async function enroll(courseId, userId) {
    try {
        const courses = await getOne(courseId);
        let course = courses[0];
        
        const users = await authService.getOne(userId);
        let user = users[0]; 

        await Course.findByIdAndUpdate(courseId, {usersEnrolled: [
            user
        ]});

        await User.findByIdAndUpdate(userId, {enrolledCourses: [
            course
        ]});
    }
    catch(e) {
        throw e;
    }
}

function isEnrolled(course, userId) {
    let isEnrolled = Course.exists({usersEnrolled: [userId], title: course.title});

    return isEnrolled;
}

function edit(courseId, data) {
    if (data.title.length < 4) throw { message: 'The title should be at least 4 characters', pageTitle: 'Edit Page', render: 'edit' }

    if (data.description.length < 20) throw { message: 'The description should be at least 20 characters long', pageTitle: 'Edit Page', render: 'edit' }

    if (data.description.length > 50) throw { message: 'The description should be at less than 50 characters long', pageTitle: 'Edit Page', render: 'edit' }

    if (!data.imageUrl.startsWith('http', 'https')) throw { message: 'The imageUrl should starts with http or https', pageTitle: 'Edit Page', render: 'edit' }

    return Course.findByIdAndUpdate(courseId, data);
}

function remove(courseId) {
    return Course.findByIdAndDelete(courseId);
}

module.exports = {
    create,
    getAll,
    getOne,
    enroll,
    isEnrolled,
    edit,
    remove
}