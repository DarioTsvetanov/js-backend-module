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
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    },
    expenses: [
        {
            ref: 'Expense',
            type: mongoose.Types.ObjectId
        }
    ]
});

// export user model by schema
module.exports = mongoose.model('User', userSchema);