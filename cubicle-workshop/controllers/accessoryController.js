const { Router } = require('express');
const accessoryService = require('../services/accessoryService');

const router = Router();

router.get('/create', (req, res) => {
    res.render('createAccessory', { title: 'Create Accessory' });
})

router.post('/create', (req, res) => {
    accessoryService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(err => console.log(err));
});

module.exports = router;