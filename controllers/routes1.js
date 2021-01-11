const express = require('express');
const routes1=express.Router();

const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const benchsales = require('../models/usermodel1');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
/*const mongourl = require('../config/mongokey');*/
require('./passport')(passport);

routes1.use(bodyparser.urlencoded({ extended: true }));

routes1.use(cookieParser('secret'));
routes1.use(session({
    secret: 'secret',
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true,
}));
routes1.use(passport.initialize());
routes1.use(passport.session());
// using flash for flash messages
routes1.use(flash());

routes1.use(function (req, res, next) {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});

const checkAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        return next();
    } else {
        res.redirect('/login');
    }
}

// Connecting To Database
mongoose.connect('mongodb://mouni1997:mounika75@fifocluster-shard-00-00.dx5lk.mongodb.net:27017,fifocluster-shard-00-01.dx5lk.mongodb.net:27017,fifocluster-shard-00-02.dx5lk.mongodb.net:27017/Fifodb?ssl=true&replicaSet=atlas-h4enxu-shard-0&authSource=admin&retryWrites=true&w=majority' ,{
    useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log("Benchsales Database Connected")
);

routes1.get('/benchsales', (req, res) => {
    res.render('benchsales');
})

routes1.post('/benchsales', (req, res) => {
    var { username,email,cname,phone, password, cpass} = req.body;
    var err;
    if (!username || !email || !cname || !phone || !password || !cpass) {
        err = "Please Fill All The Fields...";
        res.render('benchsales', { 'err': err });
    }
    if (password != cpass) {
        err = "Passwords Don't Match";
        res.render('benchsales', { 'err': err,  'username': username ,'email': email, 'cname':cname, 'phone':phone});
    }
    if (typeof err == 'undefined') {
        benchsales.findOne({ email: email }, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log("User Exists");
                err = "User Already Exists With This Email...";
                res.render('benchsales', { 'err': err, 'username': username ,'email': email, 'cname':cname, 'phone':phone });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        benchsales({
                          username,
                          email,
                          cname,
                          phone,
                          password,
                        }).save((err, data) => {
                            if (err) throw err;
                            req.flash('success_message', "Registered Successfully.. Login To Continue..");
                            res.redirect('/login');
                        });
                    });
                });
            }
        });
    }
});
routes1.get('/login', (req, res) => {
    res.render('login');
});

routes1.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/success',
        failureFlash: true,
    })(req, res, next);
});

routes1.get('/success', checkAuthenticated, (req, res) => {
    res.render('success', { 'benchsales': req.benchsales });
});


routes1.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});
module.exports = routes1;
