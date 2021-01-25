const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Create a method which is not saved in the database
personSchema.methods.getInfo = function() {
    console.log(`Hello, I am ${this.name} and I'm ${this.age} years old!`);
}

// Create a property which is not saved in the database
personSchema.virtual('birthYear')
    .get(function() {
        return 2021 - this.age;
    });

module.exports = new mongoose.model('Person', personSchema);
