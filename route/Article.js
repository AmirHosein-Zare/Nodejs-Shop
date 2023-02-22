const express = require('express');
const router = express.Router();
const {isValidArticle, Article} = require('../model/Article');

// get all Aritcle api
router.get('/', async(req, res) => {
    const articles = await Article.find();
    if(!articles) return res.status(404).send('Article Not Found');

    res.send(articles);
});