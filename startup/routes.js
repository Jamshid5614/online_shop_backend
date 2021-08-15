const express = require('express');
const errorMiddleware = require('../middlewares/errorMiddlewares');
const authRoutes = require('../routes/auth');
const shoppingCartRoutes = require('../routes/shoppingCart');
const productRoutes = require('../routes/product');
const cors = require('cors');
const {checkToken} = require('../utils/index');

module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static('uploads'));
    app.use('/api',authRoutes);
    app.use('/api/cart',shoppingCartRoutes);
    app.use('/api/products',productRoutes);
    app.use(errorMiddleware);
}

