const express = require('express');
const router = express.Router();
const {User} = require('../model/User');

router.get('/api/users', (req, res) => {
    const users = User.find();
    if(!users) return res.status(404).send('can\'t find any user');
    
    res.send(users);
});