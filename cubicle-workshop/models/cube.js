const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageUrl: {
        type: String,
        required: true,
        // validate: /^https?/,
    },
    difficultyLevel: {
        type: Number,
        required: true, 
        min: 1,
        max: 6,
    },
    //An accessories array containing objects with type and refference
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }]
});

module.exports = mongoose.model('cube', cubeSchema);