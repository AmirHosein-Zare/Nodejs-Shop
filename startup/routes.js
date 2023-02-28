const express = require('express');
const morgan = require('morgan');
const UserRoutes = require('../route/User');
const ProductRoutes = require('../route/Product');
const ContactusRoutes = require('../route/Contactus');
const ArticleRoutes = require('../route/Article');
const CommentRoutes = require('../route/Comment');
const OrderRoutes = require('../route/Order');
const StarRoutes = require('../route/Star');
const LoginRoutes = require('../route/login');

module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(morgan('tiny'));
    app.use('/api/users', UserRoutes);
    app.use('/api/products', ProductRoutes);
    app.use('/api/contactus', ContactusRoutes);
    app.use('/api/articles', ArticleRoutes);
    app.use('/api/comments', CommentRoutes);
    app.use('/api/orders', OrderRoutes);
    app.use('/api/stars', StarRoutes);
    app.use('/api/login', LoginRoutes);
}