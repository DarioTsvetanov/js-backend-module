const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const cats = require('./cats.js');

const port = 5000;

const catIdExistenceCheck = require('./middleware/middleware');
const logger = require('./middleware/logger');

const app = express();

app.use('/static', express.static('public'));
// app.use(logger);

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('hbs', handlebars({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    let name = 'Dario';

    res.render('home', { name });
});

app.get('/cats', (req, res) => {
    res.render('cats', {cats: cats.getAll()});
});

app.get('/cats/:catId', catIdExistenceCheck, (req, res) => {
    res.send(`This is the information we got for cat with id: ${req.params.catId}`);
});

app.post('/cats', (req, res) => {
    cats.add(req.body.cat);

    res.redirect('/cats');
});

app.listen(port, () => console.log(`Listening to port: ${port}`));
