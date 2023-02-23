const express = require('express');
const router = express.Router();
const {Order} = require('../model/Order');

// get all api
router.get('/', async(req, res) => {
    const orders = await Order.find();
    if(!orders) return res.status(404).send('Orders Not Found');

    res.send(orders);
});

// get by id api
router.get('/:id', async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order) return res.status(404).send('Order Not Found');

    res.send(order);
});

// post api
router.post('/', async(req, res) => {
    const order = new Order({
        User: req.body.userId,
        Product: req.body.productId
    });

    await order.save();
    res.send(order);
});

// put api
router.put('/:id', async(req, res) => {
    const newOrder = await Order.findByIdAndUpdate(req.params.id, {
        'User': req.body.userId,
        'Product': req.body.productId
    }, {new: true});
    res.send(newOrder);
});

// delete api
router.delete('/:id', async(req, res) => {
    const order = await Order.findByIdAndRemove(req.params.id);
    if(!order) return res.status(404).send('Order Not Found');

    res.send(order);
})

module.exports = router;