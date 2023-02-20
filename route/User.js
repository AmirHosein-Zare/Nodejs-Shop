const express = require('express');
const router = express.Router();
const {User} = require('../model/User');

router.get('/api/users', (req, res) => {
    const users = User.find();
    if(!users) return res.status(404).send('can\'t find any user');
    
    res.send(users);
});

router.get('/api/users/:id', (req, res) => {
    const user = User.findById(req.params.id);
    if(!user) return res.status(404).send('user Not Found!');

    res.send(user);
});