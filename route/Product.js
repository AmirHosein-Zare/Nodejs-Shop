const express = require('express');
const router = express.Router();
const {Product, isValidProduct} = require('../model/Product');

//get all products
router.get('/', async(req, res) => {
    const products = await Product.find();
    if(!products) return res.status(404).send('products Not Found');

    res.send(products);
});
