const express = require('express');
const morgan = require('morgan');
const UserRoutes = require('../route/User');
const ProductRoutes = require('../route/Product');
const ContactusRoutes = require('../route/Contactus');
const ArticleRoutes = require('../route/Article');
const CommentRoutes = require('../route/Comment');

module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(morgan('tiny'));
    app.use('/api/users', UserRoutes);
    app.use('/api/products', ProductRoutes);
    app.use('/api/contactus', ContactusRoutes);
    app.use('/api/articles', ArticleRoutes);
    app.use('/api/comments', CommentRoutes);
}