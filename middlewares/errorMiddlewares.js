const winston = require('winston');
require('express-async-errors');

module.exports = function (err,req,res,next) {
    winston.error(err.message,err);
}



