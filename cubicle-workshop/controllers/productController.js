const { Router } = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');

const router = Router();

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => res.render('home', { title: 'Cubicle', products}))
        .catch(err => console.log(err));
});

router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', { title: 'Create Cube Page' });
});

router.post('/create', (req, res) => {
    productService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(err => console.log(err));
});

router.get('/details/:productId', (req, res) => {
    productService.getOneWithAccessories(req.params.productId)
        .then(product => res.render('details', { title: 'Details', product, _id: req.params.productId}));
});

router.get('/:productId/attach', isAuthenticated, async (req, res) => {
    const product = await productService.getOne(req.params.productId)
    const accessories = await accessoryService.getAllUnattached(product.accessories);

    res.render('attachAccessory', { title: 'Attach accessory', product, accessories });

});

router.post('/:productId/attach', isAuthenticated, (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))
        .catch(err => console.log(err));
});

module.exports = router;