const express = require('express');
const router = express.Router();
const {Order} = require('../model/Order');

// get all api
router.get('/', async(req, res) => {
    const orders = await Order.find();
    if(!orders) return res.status(404).send('Orders Not Found');

    res.send(orders);
});

