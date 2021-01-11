const mongoose = require('mongoose');
//benchsales conde
const benchsalesschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cname: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified : {
        type : Boolean
    }
});
module.exports = new mongoose.model('benchsales', benchsalesschema);
