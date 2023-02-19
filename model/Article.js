const mongoose = require('mongoose');
const Joi = require('joi');
const {UserSchema} = require('./User');

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
        type: UserSchema
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    photos:{
        type: [String]
    }
});

const Article = mongoose.model('Article', ArticleSchema);

const isValidArticle = (article) => {
    const schema = Joi.object({
        title: Joi.string().trim().required(),
        date: Joi.Date(),
        description: Joi.string().trim().required(),
        photos: Joi.array()
    });

    return schema.validate(article);
}

