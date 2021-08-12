const {
    getShoppingCarts,
    deleteProductFromShoppingCart,
    addToShoppingCart,
    getShoppingCartById,
    updateShoppingCart,
} = require('../controllers/shoppingCart');
const express = require('express');
const router = express.Router();

router.get('/:id',getShoppingCartById);
router.patch('/:id',updateShoppingCart);
router.post('/new',addToShoppingCart);
router.delete('/:id',deleteProductFromShoppingCart);


module.exports = router;







