const express = require('express');
const app = express();

module.exports = () => {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static('public'));
}