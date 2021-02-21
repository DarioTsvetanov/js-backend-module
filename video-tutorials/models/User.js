// import mongoose
const mongoose = require('mongoose');

// create user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    enrolledCourses: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Course',
        }
    ]
});

// export user model by schema
module.exports = mongoose.model('User', userSchema);