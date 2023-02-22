const express = require('express');
const router = express.Router();
const {Comment, isValidComment} = require('../model/Comment');

// get all comments api
router.get('/', async(req, res) => {
    const comments = await Comment.find();
    if(!comments) return res.status(404).send('Comments Not Found');

    res.send(comments);
});