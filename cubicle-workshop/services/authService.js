const User = require('../models/User');
const config = require('../config/config');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register({username, password, repeatPassword}) {
    let errors = [];

    if (username.length < 5) errors.push('Username should be at least 5 characters.');

    if (!/^[a-zA-Z0-9]+$/.test(username)) errors.push('Username should contain only english letters and numbers.');

    if (password.length < 8) errors.push('Password should be at least 8 characters.');

    if (!/^[a-zA-Z0-9]+$/.test(password)) errors.push('Password should contain only english letters and numbers!');

    if (password !== repeatPassword) errors.push('Passwords should match!');

    let existingUser = await User.findOne({ username }).exec();

    if (existingUser) errors.push('Username already exists!');
    
    if (errors.length > 0) throw errors;

    // hash password
    bcrypt.hash(password, config.SALT_ROUNDS, async function(err, hash) {
        if (err) console.log('Cant hash password');

        // Create new User
        let user = new User({
            username,
            password: hash
        });

        return await user.save();
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