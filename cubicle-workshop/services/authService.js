const User = require('../models/User');
const config = require('../config/config');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(data) {
    // validate
    if (!/^[a-zA-Z0-9]+$/.exec(data.username)) throw new Error("Username is invalid!");

    if (!/^[a-zA-Z0-9]+$/.exec(data.password)) throw new Error("Password is invalid!");

    if (!/^[a-zA-Z0-9]+$/.exec(data.repeatPassword)) throw new Error("Repeated password is invalid!");

    if (data.password !== data.repeatPassword) throw new Error("Passwords don't match!");

    let existingUser = await User.findOne({ username: data.username }).exec();

    if (existingUser) throw new Error("Username already exists!");

    // hash password
    bcrypt.hash(data.password, config.SALT_ROUNDS, function(err, hash) {
        if (err) console.log('Cant hash password');

        // Create new User
        let user = new User({
            username: data.username,
            password: hash
        });

        return user.save();
    });
}

async function login({ username, password }) {
    try {
        let existingUser = await User.findOne({ username }).exec();

        if (!existingUser) throw new Error("Username does not exists!");
        
        const match = await bcrypt.compare(password, existingUser.password);

        if (!match) throw new Error('Password is incorrect!');

        return jwt.sign({ _id: existingUser._id }, config.PRIVATE_KEY);
    }
    catch(e) {
        throw new Error(e.message);
    }
}

module.exports = {
    register,
    login,
}