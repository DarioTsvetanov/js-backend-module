const { Router } = require('express');
const productService = require('../services/productService');

const router = Router();

router.get('/', (req, res) => {
    let products = productService.getAll(req.query);

    res.render('home', { title: 'Cubicle', products});
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube Page' });
});

router.get('/details/:productId', (req, res) => {
    let cube = productService.getOne(req.params.productId);

    res.render('details', { title: 'Details', ...cube});
});

router.post('/create', (req, res) => {
    // Validate input
    
    productService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(err => console.log(err));
});

module.exports = router;