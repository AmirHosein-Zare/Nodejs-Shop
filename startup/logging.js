const config = require('config');
const winston = require('winston');
require('winston-mongodb');

module.exports = function(){
    winston.add(winston.transports.File, {filename: 'logFile.log'});
    winston.add(winston.transports.MongoDB, {db: config.get('db'), level: 'error'});

    winston.handleExceptions(
        new winston.transports.Console({prettyprint: true}),
        new winston.transports.File({ filename: 'unhandleException.log' })
    );

    winston.rejections.handle(new winston.transports.File({ filename: 'rejection.log' }));

    process.on('uncaughtException', (ex)=> {
        winston.error(ex);
    })

    process.on('unhandledRejection', (ex) => {
        winston.error(ex);
    })
}