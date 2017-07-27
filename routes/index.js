var bcrypt = require('bcrypt-nodejs');
var db = require('../config/db');
var connection = db();
var indexController = require('../controllers/indexController');

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('index.ejs', {
      user: req.user
    });
  });

  app.get('/login', function(req, res) {
    indexController.login(req, res);
  });

  app.post('/login', passport.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    }),
    function(req, res) {
      indexController.loginPost(req, res);
    }
  );

  app.get('/signup', function(req, res) {
    indexController.signup(req, res);
  });

  // process the signup form
  app.post('/signup', function(req, res) {
    indexController.signupPost(req, res);
  });

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', indexController.isLoggedIn, function(req, res) {
    indexController.profile(req, res);
  });

  app.post('/profile', indexController.isLoggedIn, function(req, res) {
    indexController.profilePost(req,res);
  });

  app.get('/form', indexController.isLoggedIn, function(req, res) {
    indexController.form(req, res);
  });

  app.post('/form', function(req, res) {
    indexController.formPost(req, res);
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/relatorio', indexController.isLoggedIn, function(req, res) {
    indexController.relatorio(req, res);
  });

  app.get('/relatorio/:id', indexController.isLoggedIn, function(req, res) {
    indexController.relatorioById(req, res);
  });

  app.get('/usuarios', indexController.isLoggedIn, function(req, res) {
    indexController.usuarios(req, res);
  });
};
