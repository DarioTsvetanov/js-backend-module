// import mongoose
const mongoose = require('mongoose');

// create course schema
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        default: false
    },
    createdAt: {
        type: String,
        required: true
    },
    usersEnrolled: [
        {
            ref: 'User',
            type: mongoose.Types.ObjectId
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Course', courseSchema);