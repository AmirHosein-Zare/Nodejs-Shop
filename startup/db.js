const config = require('config');
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(config.get('db'))
    .then(()=>{console.log('connected to mongodb...');})
}