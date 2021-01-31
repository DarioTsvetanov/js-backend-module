const { Router } = require('express');

const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');

const router = Router();

router.use('/', homeController);
router.use('/products', productController);
router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});

module.exports = router;