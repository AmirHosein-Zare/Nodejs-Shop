const express = require('express');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const router = express.Router();
const {Order} = require('../model/Order');

// get all api
router.get('/', [admin, auth], async(req, res) => {
    const orders = await Order.find();
    if(!orders) return res.status(404).send('Orders Not Found');

    res.send(orders);
});

// get by id api
router.get('/:id', auth, async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order) return res.status(404).send('Order Not Found');

    res.send(order);
});

// post api
router.post('/', auth, async(req, res) => {
    const order = new Order({
        User: req.body.userId,
        Product: req.body.productId
    });

    await order.save();
    res.send(order);
});

// put api
router.put('/:id', [auth, admin], async(req, res) => {
    const newOrder = await Order.findByIdAndUpdate(req.params.id, {
        'User': req.body.userId,
        'Product': req.body.productId
    }, {new: true});
    res.send(newOrder);
});

// delete api
router.delete('/:id', [auth, admin], async(req, res) => {
    const order = await Order.findByIdAndRemove(req.params.id);
    if(!order) return res.status(404).send('Order Not Found');

    res.send(order);
})

module.exports = router;