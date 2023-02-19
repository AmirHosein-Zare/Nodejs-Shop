const mongoose = require('mongoose');
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

const Order = mongoose.model('Order', OrderSchema);

module.exports.OrderSchema = OrderSchema;
module.exports.Order = Order;