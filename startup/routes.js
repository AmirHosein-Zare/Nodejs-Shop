const express = require('express');
const app = express();
const morgan = require('morgan');

module.exports = () => {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(morgan('tiny'));
}