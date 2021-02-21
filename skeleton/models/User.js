// import mongoose
const mongoose = require('mongoose');

// create user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// export user model by schema
module.exports = mongoose.model('User', userSchema);