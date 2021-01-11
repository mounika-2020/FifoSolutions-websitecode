const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
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
    cname: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    messages: [{
        type: String,
    }]
});

module.exports = new mongoose.model('user', userschema);
