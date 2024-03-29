const express = require('express');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const router = express.Router();
const {isValidArticle, Article} = require('../model/Article');
const {User} = require('../model/User');
const objectId = require('../middleware/objectId');

// get all Aritcle api
router.get('/', async(req, res) => {
    const articles = await Article.find();
    if(!articles) return res.status(404).send('Article Not Found');

    res.send(articles);
});

//get article by id api
router.get('/:id', objectId, async(req, res) => {
    const article = await Article.findById(req.params.id);
    if(!article) return res.status(404).send('Article Not Found');

    res.send(article);
});

// post article api
router.post('/', [auth, admin], async(req, res) => {
    const {error} = isValidArticle(req.body);
    if(error) return res.status(400).send('Not Valid Data');

    const newArticle = req.body;

    const article = new Article({
        title: newArticle.title,
        description: newArticle.description,
        author: newArticle.userId,
        photo: newArticle.photo
    });

    await article.save();
    res.send(article);
});

// PUT API
router.put('/:id', [admin, auth, objectId], async(req, res) => {
    // check article
    const check = await Article.findById(req.params.id);
    if(!check) return res.status(404).send('Article Not Found');

    // check validation
    const {error} = isValidArticle(req.body);
    if(error) return res.status(400).send('Article Not Valid');

    const newArticle = req.body;

    // update Article
    const article = await Article.findByIdAndUpdate(req.params.id, {
        $set:{
            'title': newArticle.title,
            'description': newArticle.description,
            'author': newArticle.userId,
            'photo': newArticle.photo
        }
    }, {new: true});

    res.send(article);
})

// delete api
router.delete('/:id', [auth, admin, objectId], async(req, res) => {
    const article = await Article.findByIdAndRemove(req.params.id);
    if(!article) return res.status(404).send('article Not Found');

    res.send(article);
});

module.exports = router;