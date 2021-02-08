const { Router } = require('express');

const isGuest = require('./middlewares/isGuest');

const homeController = require('./controllers/homeController');
const productController = require('./controllers/productController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/products', productController);
router.use('/accessory', accessoryController);

router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});

module.exports = router;