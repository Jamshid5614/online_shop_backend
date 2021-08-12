const {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    addToCart,
    getProductsByModel,
    getProductByCategory,
} = require('../controllers/product');
const express = require('express');
const router = express.Router();
const {upload} = require('../utils/index')

router.get('/search',getProductsByModel);
router.patch('/:id', updateProduct);
router.delete('/:id',deleteProduct);
router.get('/',getProducts);
router.get('/:id',getProductById);
router.post('/addToCart/:id',addToCart);
router.post('/new',upload.array('images',12),createProduct);
router.get('/categories/:category',getProductByCategory);

module.exports = router;