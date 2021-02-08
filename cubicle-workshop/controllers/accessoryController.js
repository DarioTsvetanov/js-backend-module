const { Router } = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const accessoryService = require('../services/accessoryService');

const router = Router();

router.get('/create', isAuthenticated, (req, res) => {
    res.render('createAccessory', { title: 'Create Accessory' });
})

router.post('/create', isAuthenticated, (req, res) => {
    accessoryService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(err => console.log(err));
});

module.exports = router;