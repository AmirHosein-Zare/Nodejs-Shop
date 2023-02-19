const mongoose = require('mongoose');
const Joi = require('joi');

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
    Comments: [String] // replace it with Comment Model
});