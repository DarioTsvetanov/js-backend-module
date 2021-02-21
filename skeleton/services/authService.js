// import bcrypt
const bcrypt = require('bcrypt');

// import user model
const User = require('../models/User');

// import salt rounds from config
const config = require('../config/config');

// import jsonwebtoken
const jwt = require('jsonwebtoken');

function register(username, password, repeatPassword) {
    // TODO: validate

    if (username.length < 5) throw { message: 'Username should be at least 5 characters!', render: 'register', pageTitle: 'Register Page'};

    if (!/^[a-zA-Z0-9]+$/g.test(username)) throw { message: 'Username should consist only english letters and numbers!', render: 'register', pageTitle: 'Register Page'};

    if (password.length < 5) throw { message: 'Password should be at least 5 characters!', render: 'register', pageTitle: 'Register Page'};

    if (!/^[a-zA-Z0-9]+$/g.test(password)) throw { message: 'Password should consist only english letters and numbers!', render: 'register', pageTitle: 'Register Page'};

    if (password !== rePassword) throw { message: 'Both passwords must match!', render: 'register', pageTitle: 'Register Page'};

    // sanitizing username
    username = username.toLowerCase();

    // search for user in db
    const user = await User.findOne({ username });

    // throw an error if user is missing
    if (user) throw { message: 'User already exists!', render: 'register', pageTitle: 'Register Page' };

    return new Promise((resolve, reject) => {
        bcrypt.hash(password, config.SALT_ROUNDS, function(err, hash) {

            // in case of error display message
            if (err) return reject();
    
            // Create new User
            let user = new User({
                username,
                password: hash
            });
    
            // return created use
            resolve(user.save());
        });
    });
}

async function login(username, password) {
    try {
        // TODO: Validate
        if (username.length < 5) throw { message: 'Username should be at least 5 characters!', render: 'login', pageTitle: 'Login Page'};

        if (!/^[a-zA-Z0-9]+$/g.test(username)) throw { message: 'Username should consist only english letters and numbers!', render: 'login', pageTitle: 'Login Page'};

        if (password.length < 5) throw { message: 'Password should be at least 5 characters!', render: 'login', pageTitle: 'Login Page'};

        if (!/^[a-zA-Z0-9]+$/g.test(password)) throw { message: 'Password should consist only english letters and numbers!', render: 'login', pageTitle: 'Login Page'};

        // sanitizing username
        username = username.toLowerCase();

        // search in db for user
        const user = await User.findOne({ username });

        // throw an error if user is missing
        if (!user) throw { message: 'User does not exist!', render: 'login', pageTitle: 'Login Page' };

        // compare passwords
        const match = await bcrypt.compare(password, user.password);

        // in case of no match throw an error
        if (!match) throw { message: 'Password does not match!', render: 'login', pageTitle: 'Login Page' };

        // return token with id of the user
        return jwt.sign({ _id: user._id, username }, config.SECRET);
    }
    catch(e) {
        // throw error to controller
        throw e;
    }
}

function getOne(id) {
    return User.find({_id: id}).lean();
}

module.exports = {
    register,
    login,
    getOne
}