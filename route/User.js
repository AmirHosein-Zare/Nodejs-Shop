const express = require('express');
const router = express.Router();
const {User, isValidUser} = require('../model/User');

router.get('/', async (req, res) => {
    const users = await User.find();
    if(!users) return res.status(404).send('can\'t find any user');
    
    res.send(users);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send('user Not Found!');

    res.send(user);
});

router.put('/', async (req, res) => {
    const {error} = isValidUser(req.body);
    if(error) return res.status(400).send('Not valid data');

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        number: req.body.number,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        comments: [],
        orders: []
    });

    await user.save();
    res.send(user);
})