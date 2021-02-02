const mongoose = require('mongoose');

module.exports = () => {
    // set up the database connection, after the server port we set the name of our database
    mongoose.connect('mongodb://localhost/cubicle', {useNewUrlParser: true, useUnifiedTopology: true});
    
    // connect to the database
    const db = mongoose.connection;

    // in case of error we send a message in the console
    db.on('error', console.error.bind(console, 'connection error:'));

    // after the db is connected, a message is displayed in the console
    db.once('open', console.log.bind(console, 'Db Connected!'));
} 