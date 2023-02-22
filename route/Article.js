const express = require('express');
const router = express.Router();
const {isValidArticle, Article} = require('../model/Article');
const {User} = require('../model/User');

// get all Aritcle api
router.get('/', async(req, res) => {
    const articles = await Article.find();
    if(!articles) return res.status(404).send('Article Not Found');

    res.send(articles);
});

//get article by id api
router.get('/:id', async(req, res) => {
    const article = await Article.findById(req.params.id);
    if(!article) return res.status(404).send('Article Not Found');

    res.send(article);
});

// post article api
router.post('/', async(req, res) => {
    const {error} = isValidArticle(req.body);
    if(error) return res.status(400).send('Not Valid Data');

    const newArticle = req.body;

    const article = new Article({
        title: newArticle.title,
        description: newArticle.description,
        author: User.findById(newArticle.userId),
        photo: newArticle.photo
    });

    await article.save();
    res.send(article);
});

// PUT API
router.put('/:id', async(req, res) => {
    // check article
    const article = await Article.findById(req.params.id);
    if(!article) return res.status(404).send('Article Not Found');

    // check validation
    const {error} = isValidArticle(req.body);
    if(error) return res.status(404).send('Article Not Valid');

    // update Article
    const newArticle = await Article.findByIdAndUpdate(req.params.id, {
        $set:{
            title: newArticle.title,
            description: newArticle.description,
            author: User.findById(newArticle.userId)
        }
    }, {new: true});

    res.send(newArticle);
})