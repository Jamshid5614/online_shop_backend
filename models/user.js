const mongoose = require('mongoose');





const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    img: String,
    lang: {
        type: String,
        enum: ['en','ru','uz'],
        default: 'en'
    }
});

const UserModel = mongoose.model('Users',userSchema);


module.exports = UserModel;



