const express = require('express');
const router = express.Router();
const {Comment, isValidComment} = require('../model/Comment');

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
    const comment = new Comment({
        User: req.body.userId,
        Product: req.body.productId,
        message: req.body.message
    });

    await comment.save();
    res.send(comment);
});

//put api
router.put('/:id', async(req, res) => {
    const result = await Comment.findById(req.params.id);
    if(!result) return res.status(404).send('Comment Not Found');

    const comment = await Comment.findByIdAndUpdate(req.params.id, {
        $set:{
            User: req.body.userId,
            Product: req.body.productId,
            message: req.body.message
        }
    }, {new: true});

    res.send(comment);
});

// delete Api
router.delete('/:id', async(req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if(!comment) return res.status(404).send('Comment Not Found');

    res.send(comment);
});

module.exports = router;