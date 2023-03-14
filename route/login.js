const express = require('express');
const router = express.Router();
const {User} = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

// login request
router.post('/', async(req, res) => {
    // find user with username
    const user = await User
        .findOne({username: req.body.username})
        .select({username: 1, password: 1});
    console.log(user);
    if(!user) return res.status(404).send('User Not Found');
    // check password
    if(bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(err){
            console.log(err);
        }
        return result;
    })){
        const token = await user.getJwt();
        res.status(200).header('x-header-auth', token);
    }
    else{
        res.status(400).send('username or password is incorrect');
    }
});

module.exports = router;