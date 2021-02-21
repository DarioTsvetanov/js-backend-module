module.exports = (err, req, res, next) => {
    console.log(err);

    // in case of missing message return a message
    err.message = err.message || 'Something went wrong';

    // in case of missing status return 500
    err.status = err.status || 500;

    //if (err.message.includes('Refillabe')) return res.render('home', {error: err, title: 'Home Page'})

    // render to home page
    res.status(err.status).render(err.render, { error: err, title: err.pageTitle })
};