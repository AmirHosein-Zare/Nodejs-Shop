const config = require('config');
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://127.0.0.1/Saffron")
        .then(()=>{console.log('connected to mongodb...');})
        .catch(()=>{console.log('connection failed...');});
}