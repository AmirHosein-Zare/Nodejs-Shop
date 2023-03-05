const express = require('express');
const router = express.Router();
const {User, isValidUser} = require('../model/User');
const auth = require('../middleware/auth');

//get users reequest Api -> it returns al users
router.get('/', auth, async (req, res) => {
    const users = await User.find();
    if(!users) return res.status(404).send('can\'t find any user');
    
    res.send(users);
});

// get user bi id 
router.get('/:id', auth, async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send('user Not Found!');

    res.send(user);
});

// get user (name -- username -- email ) 


// post request -> create new user
router.post('/', auth, async (req, res) => {
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
});

//put request -> edit all data
router.put('/:id', auth, async (req, res) => {
    //get user with id from url params
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send('User Not Found');

    // check valid data
    const {error} = isValidUser(req.body);
    if(error) return res.status(400).send('Noy valid data');

    // get new user
    const newUser = req.body;

    //update user
    const result = await User.findByIdAndUpdate(req.params.id, {
        $set:{
            'name': newUser.name,
            'username': newUser.username,
            'number': newUser.number,
            'email': newUser.email,
            'password': newUser.password,
            'address': newUser.address,
        }
    }, {new: true});

    res.send(result);
});

// edit one of the comment or order

// delete request
router.delete('/:id', auth, async (req, res) => {
    // find user and delete
    const user = await User.findByIdAndRemove(req.params.id);
    res.send(user);
});

module.exports = router;