const mongoose = require('mongoose');
const {Product} = require('./Product'); 
const {User} = require('./User'); 

const OrderSchema = new mongoose.Schema({
    Product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports.OrderSchema = OrderSchema;
module.exports.Order = Order;