module.exports = (err, req, res, next) => {
    console.log(err);

    // in case of missing message return a message
    err.message = err.message || 'Something went wrong';

    // in case of missing status return 500
    err.status = err.status || 500;

    // render to home page
    res.status(err.status).render(err.render, { error: err, title: err.pageTitle })
};