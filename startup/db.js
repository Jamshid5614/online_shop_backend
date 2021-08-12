const mongoose = require('mongoose');
const winston = require('winston');



module.exports = function () {
    mongoose.connect('mongodb://localhost/online-shop', {useNewUrlParser: true,useUnifiedTopology: true})
        .then(() => console.log('mogodbga ulanish hosil qilindi'))
        .catch(err => winston.error(err.message,err))
}









