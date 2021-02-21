// import mongoose 
const mongoose = require('mongoose');

// create expense schema
const expenseSchema = new mongoose.Schema({
    merchant: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    report: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Expense', expenseSchema);