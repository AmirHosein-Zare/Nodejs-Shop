const mongoose = require('mongoose');
const Joi = require('joi');
const {CommentSchema} = require('./Comment');
const {StarSchema} = require('../model/Star');

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    amount:{
        type: Number,
        required: true,
        min: 0,
    },
    price:{
        type: Number,
        min: 0,
        required: true
    },
    picture:{
        type: String,
        trim: true,
        required: false
    },
    expain:{
        type: String,
        trim: true,
        required: false
    },
    weight:{
        type: Number,
        required: true,
        min: 0
    },
    size:{
        type: String,
        trim: true,
        required: false
    },
    warranty:{
        type: Boolean,
        default: true
    },
    type:{
        type: String,
        trim: true,
        required: true
    },
    offPercent:{
        type: Number,
        min: 0,
        max: 100
    },
    neighbor:{
        type: String
    },
    Comments: [CommentSchema],
    Star: {
        type: StarSchema,
        default: {
             Product: this.ProductSchema,
             average: 0
        }
    }
});

const Product = mongoose.model('Product', ProductSchema);

const isValidProduct = (product) => {
    const schema = Joi.object({
        name: Joi.string().required().trim().min(3),
        amount: Joi.number().required().min(0),
        price: Joi.number().required().min(0),
        picture: Joi.string().trim().required(),
        explain: Joi.string().required().trim(),
        weight: Joi.number().min(0).required(),
        size: Joi.string().required().trim(),
        warranty: Joi.boolean().default(true),
        type: Joi.string().trim().required(),
        offPercent: Joi.number().min(0).max(100),
        neighbor: Joi.string()
    })

    return schema.validate(product);
}

module.exports.isValidProduct = isValidProduct;
module.exports.ProductSchema = ProductSchema;
module.exports.Product = Product;