// import mongoose
const mongoose = require('mongoose');

// import PORT from config file
const { DB_CONNECTION } = require('./config');

// connect database
mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

const db = mongoose.connection;

// in case of error display message
db.on('error', console.error.bind(console, 'connection error:'));

// after success display message
db.once('open', function() {
    console.log('DB connected!');
});

module.exports = db;