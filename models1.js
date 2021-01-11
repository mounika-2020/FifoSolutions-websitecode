const mongoose = require('mongoose');
//Benchsales schema
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
    }
});

module.exports = new mongoose.model('benchsales', benchsalesschema);
