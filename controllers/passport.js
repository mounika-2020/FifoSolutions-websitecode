const passport=require("passport");
const localStrategy = require('passport-local').Strategy;
const user = require('../models/usermodel');
const benchsales = require('../models/usermodel1');
const bcrypt = require('bcryptjs');
module.exports = function (passport) {
    passport.use('vendor',new localStrategy({ usernameField: 'email' }, (email, password, done) => {
      user.findOne({ email: email }, (err, data) => {
            if (err) throw err;
            if (!data) {
                return done(null, false, { message: "User Doesn't Exists.." });
            }
            bcrypt.compare(password, data.password, (err, match) => {
                if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false, { message: "Password Doesn't Match" });
                }
                if (match) {
                    return done(null, data);
                }
            });
          });
          passport.use('benchsales',new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            user.findOne({ email: email }, (err, data) => {
                  if (err) throw err;
                  if (!data) {
                      return done(null, false, { message: "User Doesn't Exists.." });
                  }
                  bcrypt.compare(password, data.password, (err, match) => {
                      if (err) {
                          return done(null, false);
                      }
                      if (!match) {
                          return done(null, false, { message: "Password Doesn't Match" });
                      }
                      if (match) {
                          return done(null, data);
                      }
                  });
                });
        }
    }));

    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        user.findById(id, function (err, user) {
            cb(err, user);
        });
    });
}

//benchsales
/*module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        benchsales.findOne({ email: email }, (err, data) => {
            if (err) throw err;
            if (!data) {
                return done(null, false, { message: "User Doesn't Exists.." });
            }
            bcrypt.compare(password, data.password, (err, match) => {
                if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false, { message: "Password Doesn't Match" });
                }
                if (match) {
                    return done(null, data);
                }
            });
        });
    }));

    passport.serializeUser(function (benchsales, cb) {
        cb(null, benchsales.id);
    });

    passport.deserializeUser(function (id, cb) {
        benchsales.findById(id, function (err, benchsales) {
            cb(err, benchsales);
        });
    });
}
*/



/*----*/

/*module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        user.findOne({ email: email }, (err, data) => {
            if (err) throw err;
            if (!data) {
                return done(null, false, { message: "User Doesn't Exists.." });
            }
            bcrypt.compare(password, data.password, (err, match) => {
                if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false, { message: "Password Doesn't Match" });
                }
                if (match) {
                    return done(null, data);
                }
            });
        });
    }));

    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        user.findById(id, function (err, user) {
            cb(err, user);
        });
    });
}*/

//benchsales
/*module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        benchsales.findOne({ email: email }, (err, data) => {
            if (err) throw err;
            if (!data) {
                return done(null, false, { message: "User Doesn't Exists.." });
            }
            bcrypt.compare(password, data.password, (err, match) => {
                if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false, { message: "Password Doesn't Match" });
                }
                if (match) {
                    return done(null, data);
                }
            });
        });
    }));

    passport.serializeUser(function (benchsales, cb) {
        cb(null, benchsales.id);
    });

    passport.deserializeUser(function (id, cb) {
        benchsales.findById(id, function (err, benchsales) {
            cb(err, benchsales);
        });
    });
}*/
