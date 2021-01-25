function logger(req, res, next) {
    console.log(req.originalUrl);

    return next();
}

module.exports = logger;