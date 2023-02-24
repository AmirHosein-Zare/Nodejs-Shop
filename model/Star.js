const mongoose = require('mongoose');
const {Product} = require('./Product');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const StarSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    average:{
        type: Number,
        min: 0
    }
});

const Star = mongoose.model('Star', StarSchema);

const isValidStar = (data) => {
    const schema = Joi.object({
        productId: Joi.objectId()
    });

    return schema.validate(data);
}

module.exports.StarSchema = StarSchema;
module.exports.Star = Star;