const config = require('config');
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(config.get('db'))
        .then(()=>{winston.info('connected to mongodb...')})
        .catch(()=>{winston.info('connection failed...')});
}