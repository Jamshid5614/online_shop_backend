require('express-async-errors');
const winston = require('winston');


module.exports = function () {
    
    winston.exceptions.handle(new winston.transports.Console({level: 'error'}));
    process.on('unhandledRejection', ex => {
        throw ex;
    })
}










