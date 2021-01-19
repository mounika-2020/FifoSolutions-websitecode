const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const user = require('../models/usermodel');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
/*const mongourl = require('../config/mongokey');*/
require('./passport')(passport);

routes.use(bodyparser.urlencoded({ extended: true }));
routes.use(cookieParser('secret'));
routes.use(session({
    secret: 'secret',
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true,
}));

routes.use(passport.initialize());
routes.use(passport.session());

routes.use(flash());

routes.use(function (req, res, next) {
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
//*
// Connecting To Database
mongoose.connect('mongodb://mouni1997:mounika75@fifocluster-shard-00-00.dx5lk.mongodb.net:27017,fifocluster-shard-00-01.dx5lk.mongodb.net:27017,fifocluster-shard-00-02.dx5lk.mongodb.net:27017/Fifodb?ssl=true&replicaSet=atlas-h4enxu-shard-0&authSource=admin&retryWrites=true&w=majority' ,{
    useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log("Database Connected")
);

routes.get('/',(req,res) => {
  res.sendfile(__dirname,'index');
})
// ALL THE ROUTES
routes.get('/vendor', (req, res) => {
    res.render('vendor');
})

routes.post('/vendor', (req, res) => {
     var { username,email,phone, password, cpass,cname,address,country } = req.body;
    var err;
    if (!username || !email || !phone || !password || !cpass || !cname || !address || !country) {
        err = "Please Fill All The Fields...";
        res.render('vendor', { 'err': err });
    }
    if (password != cpass) {
        err = "Passwords Don't Match";
        res.render('vendor', { 'err': err,  'username': username ,'email': email,'phone':phone,'cname':cname, 'address':address,'country':country});
    }
    if (typeof err == 'undefined') {
        user.findOne({ email: email }, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log("User Exists");
                err = "User Already Exists With This Email...";
                res.render('vendor', { 'err': err, 'username': username,'email': email, 'phone':phone, 'cname':cname, 'address':address,'country':country });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        user({
                          username,
                            email,
                          password,
                          phone,
                          cname,
                          address,
                          country,
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
routes.get('/login', (req, res) => {
    res.render('login');
});

routes.post('/login', (req, res, next) => {
    debugger
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/success',
        failureFlash: true,
    })(req, res, next);
});

routes.get('/success', checkAuthenticated, (req, res) => {
    res.render('success', { 'user': req.user });
});


routes.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});
module.exports = routes;
