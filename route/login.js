const express = require('express');
const router = express.Router();
const {User} = require('../model/User');

// login request
router.post('/', async(req, res) => {
    // find user with username
    const user = await User
        .findOne({username: req.body.username})
        .select({username: 1, password: 1});
    console.log(user);
    if(!user) return res.status(404).send('User Not Found');
    // check password
    if(req.body.password === user.password){
        console.log("true");
        const token = await user.getJwt();
        res.status(200).header('x-header-auth', token);
    }
    else{
        res.status(400).send('username or password is incorrect');
    }
});

module.exports = router;