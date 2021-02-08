const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = () => {
    return (req, res, next) => {
        let token = req.cookies['USER_SESSION'];
        
        if (token) {
            jwt.verify(token, config.PRIVATE_KEY, function(err, decoded) {
                if (err) {
                    res.clearCookie('USER_SESSION');
                }   
                else {
                    req.user = decoded;
                    res.locals.isAuthenticated = true;
                }
            });
        }

        next();
    }
}