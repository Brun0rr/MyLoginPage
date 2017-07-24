// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var bcrypt = require('bcrypt-nodejs');
var connection = require('./database');

// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM tb_usuario WHERE id = ? ", [id], function(err, rows) {
      done(err, rows[0]);
    });
  });

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    'local-login',
    new LocalStrategy({
        // by default, local strategy uses email and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) { // callback with email and password from our form
        connection.query("SELECT * FROM tb_usuario WHERE email = ?", [email], function(err, rows) {
          if (err)
            return done(err);
          if (!rows.length) {
            return done(null, false, req.flash('loginMessage', 'Usuário não encontrado')); // req.flash is the way to set flashdata using connect-flash
          }

          // if the user is found but the password is wrong
          if (!bcrypt.compareSync(password, rows[0].password))
            return done(null, false, req.flash('loginMessage', 'Senha inválida')); // create the loginMessage and save it to session as flashdata

          // all is well, return successful user
          return done(null, rows[0]);
        });
      })
  );
};
