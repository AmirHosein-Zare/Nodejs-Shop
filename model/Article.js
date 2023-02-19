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