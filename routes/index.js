// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//
// module.exports = router;

var bcrypt = require('bcrypt-nodejs');
var connection = require('../config/database');

module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res) {
    res.render('index.ejs', {
      user: req.user
    }); // load the index.ejs file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', {
      message: req.flash('loginMessage'),
      user: req.user,
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
      successRedirect: '/', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }),
    function(req, res) {
      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect('/');
    });

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    if (req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.render('signup.ejs', {
        message: req.flash('signupMessage'),
        user: req.user
      });
    }
  });

  // process the signup form
  app.post('/signup', function(req, res) {
    var data = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, null, null) // use the generateHash function in our user model
    };
    connection.query("SELECT * FROM users WHERE email = ?", [data.email], function(err, rows) {
      if (err)
        console.log(err);
      if (rows.length) {
        req.flash('signupMessage', 'E-mail já cadastrado');
        res.redirect('/signup');
      } else {
        connection.query("INSERT INTO users ( name, phone, email, password ) values (?,?,?,?)", [data.name, data.phone, data.email, data.password], function(err, rows) {
          if (err)
            console.log(err);
          res.redirect('/login');
        });
      }
    });
  });

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user: req.user,
      message: req.flash('profileMessage')
      // get the user out of session and pass to template
    });
  });

  app.post('/profile', isLoggedIn, function(req, res) {
    user = req.user;
    user.name = req.body.name;
    user.phone = req.body.phone;
    user.password = bcrypt.hashSync(req.body.password, null, null);
    connection.query("UPDATE users SET name = ?, phone = ?, password = ? WHERE id = ?", [user.name, user.phone, user.password, user.id], function(err, rows) {
      if (err)
        console.log(err);
      req.flash('profileMessage', 'Dados alterados com sucesso');
      res.redirect('/profile');
    });
  });

  app.get('/form', function(req, res) {
    res.render('form.ejs', {
      user: req.user,
      // message: req.flash('profileMessage')
      // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}
