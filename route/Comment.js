const express = require('express');
const router = express.Router();
const {Comment, isValidComment} = require('../model/Comment');
const { Product } = require('../model/Product');
const { User } = require('../model/User');

// get all comments api
router.get('/', async(req, res) => {
    const comments = await Comment.find();
    if(!comments) return res.status(404).send('Comments Not Found');

    res.send(comments);
});

// get comment by id
router.get('/:id', async(req, res) => {
    const comment = await Comment.findById();
    if(!comment) return res.status(404).send('Comment Not Found');

    res.send(comment);
});

// post api
router.post('/', async(req, res) => {
    const {error} = isValidComment(req.body);
    if(error) return res.status(400).send('Not Valid Data');

    const comment = new Comment({
        User: await User.findById(req.body.userId),
        Product: await Product.findById(req.body.productId),
        message: req.body.message
    });

    await comment.save();
    res.send(comment);
});

//put api