const mongoose = require('mongoose');
const Joi = require('joi');
const {UserSchema} = require('./User');
const {ProductSchema} = require('./Product');

const CommentSchema = new mongoose.Schema({
    User:{
        type: UserSchema
    },
    Product:{
        type: ProductSchema
    },
    message:{
        type: String,
        trim: true,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

const isValidComment = (comment) => {
    const schema = Joi.object({
        message: Joi.string().required().trim()
    })

    return schema.validate(comment);
}

module.exports.isValidComment = isValidComment;
module.exports.CommentSchema = CommentSchema;
module.exports.Comment = Comment;