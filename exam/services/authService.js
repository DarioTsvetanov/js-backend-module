// import bcrypt
const bcrypt = require('bcrypt');

// import user model
const User = require('../models/User');

// import salt rounds from config
const config = require('../config/config');

// import jsonwebtoken
const jwt = require('jsonwebtoken');

async function register(username, password, repeatPassword, amount) {
    // TODO: validate

    if (!username) throw { message: 'Username is required', render: 'register', pageTitle: 'Register Page' }

    if (!password) throw { message: 'Password is required', render: 'register', pageTitle: 'Register Page' }

    if (!repeatPassword) throw { message: 'Repeat Password is required', render: 'register', pageTitle: 'Register Page' }

    if (!amount) throw { message: 'Amount is required', render: 'register', pageTitle: 'Register Page' }

    if (username.length < 4) throw { message: 'Username should be at least 4 characters!', render: 'register', pageTitle: 'Register Page'};

    if (!/^[a-zA-Z0-9]+$/g.test(username)) throw { message: 'Username should consist only english letters and numbers!', render: 'register', pageTitle: 'Register Page'};

    if (password.length < 4) throw { message: 'Password should be at least 4 characters!', render: 'register', pageTitle: 'Register Page'};

    if (!/^[a-zA-Z0-9]+$/g.test(password)) throw { message: 'Password should consist only english letters and numbers!', render: 'register', pageTitle: 'Register Page'};

    if (repeatPassword.length < 4) throw { message: 'Repeat Password should be at least 4 characters!', render: 'register', pageTitle: 'Register Page'};

    if (!/^[a-zA-Z0-9]+$/g.test(repeatPassword)) throw { message: 'Repeat Password should consist only english letters and numbers!', render: 'register', pageTitle: 'Register Page'};

    if (password !== repeatPassword) throw { message: 'Both passwords must match!', render: 'register', pageTitle: 'Register Page'};

    if (Number(amount) < 0 || isNaN(Number(amount))) throw { message: 'The account amount should be positive number', render: 'register', pageTitle: 'Register Page'}

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
                password: hash,
                amount
            });
    
            // return created use
            resolve(user.save());
        });
    });
}

async function login(username, password) {
    try {
        // TODO: Validate
        if (username.length < 4) throw { message: 'Username should be at least 4 characters!', render: 'login', pageTitle: 'Login Page'};

        if (!/^[a-zA-Z0-9]+$/g.test(username)) throw { message: 'Username should consist only english letters and numbers!', render: 'login', pageTitle: 'Login Page'};

        if (password.length < 4) throw { message: 'Password should be at least 4 characters!', render: 'login', pageTitle: 'Login Page'};

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
    return User.find({_id: id}).populate('expenses').lean();
}

module.exports = {
    register,
    login,
    getOne
}