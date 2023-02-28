const express = require('express');
const router = express.Router();
const {User} = require('../model/User');

// login request
router.post('/', async(req, res) => {
    // find user with username
    const user = await User
        .find({username: req.body.name})
        .select({username: 1, password: 1});
    if(!user) return res.status(404).send('User Not Found');
    // check password
    if(req.body.password === user.password){
        res.status(200).header('x-header-auth', await user.getJwt());
    }
    else{
        res.status(400).send('username or password is incorrect');
    }
});

module.exports = router;