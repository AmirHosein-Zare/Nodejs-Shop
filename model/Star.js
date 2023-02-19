const mongoose = require('mongoose');
const {ProductSchema} = require('./Product');

const StarSchema = new mongoose.Schema({
    Product:{
        type: ProductSchema
    },
    average:{
        type: Number,
        min: 0
    }
});

const Star = mongoose.model('Star', StarSchema);

module.exports.StarSchema = StarSchema;
module.exports.Star = Star;