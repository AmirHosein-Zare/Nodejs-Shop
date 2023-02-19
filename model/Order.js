const mongoose = require('mongoose');
const Joi = require('joi');
const {ProductSchema} = require('./Product'); 
const {UserSchema} = require('./User'); 

const OrderSchema = new mongoose.Schema({
    Product:{
        type: ProductSchema
    },
    User:{
        type: UserSchema
    },
    date: {
        type: Date,
        default: Date.now
    }
});