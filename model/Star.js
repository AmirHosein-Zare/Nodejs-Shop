const mongoose = require('mongoose');
const {Product} = require('./Product');

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

module.exports.StarSchema = StarSchema;
module.exports.Star = Star;