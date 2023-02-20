const Joi = require('joi');
const mongoose = require('mongoose');
const {CommentSchema} = require('./Comment');
const {OrderSchema} = require('./Order');

// regular expression for email
let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
        minlength: 3,
        lowercase: true
    },
    username:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    number:{
        type: String,
        trim: true,
        required: true,
        minlength: 11,
        maxlength: 11
    },
    email:{
        type: String,
        required: true,
        trim: true,
        match: regex
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 255
    },
    comments: [CommentSchema], // replace it with Comment Model
    address:{
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 555
    },
    Order: [OrderSchema], // replace it with Order Model
});

const User = mongoose.model('User', UserSchema);

const isValidUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(255).trim().lowercase(),
        username: Joi.string().required().min(3).max(255).trim(),
        number: Joi.string().required().length(11).trim(),
        email: Joi.string().required().pattern(regex),
        password: Joi.string().required().trim().min(6).max(255),
        address: Joi.string().trim()
    });

    return schema.validate(user);
};

module.exports.UserSchema = UserSchema;
module.exports.User = User;
module.exports.isValidUser = isValidUser;