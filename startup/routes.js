const express = require('express');
const app = express();
const morgan = require('morgan');
const UserRoutes = require('../route/User');

module.exports = () => {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(morgan('tiny'));
    app.use('/api/users', UserRoutes);
}