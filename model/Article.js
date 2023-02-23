const mongoose = require('mongoose');
const Joi = require('joi');
const {User} = require('./User');

const ArticleSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:  'User'
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    photo:{
        type: String
    }
});

const Article = mongoose.model('Article', ArticleSchema);

const isValidArticle = (article) => {
    const schema = Joi.object({
        title: Joi.string().trim().required(),
        date: Joi.date(),
        description: Joi.string().trim().required(),
        photo: Joi.string()
    });

    return schema.validate(article);
}

module.exports.isValidArticle = isValidArticle;
module.exports.ArticleSchema = ArticleSchema;
module.exports.Article = Article;