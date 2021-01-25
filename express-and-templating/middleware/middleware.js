function middleware(req, res, next) {
    console.log('hello from middleware');

    if (req.params.catId) next();
    else res.status(403).send('You need to specify the catId');
}

module.exports = middleware;