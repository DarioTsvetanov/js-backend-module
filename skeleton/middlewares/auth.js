// import SECRET
const { SECRET } = require('../config/config');

// import cookie name
const { COOKIE_NAME } = require('../config/config');

// import jsonwebtoken
const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
    // get token from cookie
    const token = req.cookies[COOKIE_NAME];

    // token exists
    if (token) {
        // decode token
        jwt.verify(token, SECRET, function(err, decoded) {
            // in case of error clear cookie
            if (err) return res.clearCookie(COOKIE_NAME);

            // set token in request
            req.user = decoded;

            // set user token in response
            res.locals.user = decoded;

            // set a variable in response
            res.locals.isAuth = true;
        });
    }

    next();
}

module.exports = auth;