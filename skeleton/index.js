// import express
const express = require('express');

// import config object
const { PORT } = require('./config/config');

// import routes
const routes = require('./routes');

// import errorHandler
const errorHandler = require('./middlewares/errorHandler');

// initialize app
const app = express();

// import db
require('./config/mongoose');

// import and start express configuration
require('./config/express')(app);

// Use routes for every action
app.use(routes);

// use error handler
app.use(errorHandler);

// start app on port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));