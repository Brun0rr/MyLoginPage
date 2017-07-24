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
var dateFormat = require('dateformat');

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
      nome: req.body.nome,
      telefone: req.body.telefone,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, null, null) // use the generateHash function in our user model
    };
    connection.query("SELECT * FROM tb_usuario WHERE email = ?", [data.email], function(err, rows) {
      if (err)
        console.log(err);
      if (rows.length) {
        req.flash('signupMessage', 'E-mail já cadastrado');
        res.redirect('/signup');
      } else {
        connection.query("INSERT INTO tb_usuario ( nome, telefone, email, password ) values (?,?,?,?)", [data.nome, data.telefone, data.email, data.password], function(err, rows) {
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
    });
  });

  app.post('/profile', isLoggedIn, function(req, res) {
    user = req.user;
    user.nome = req.body.nome;
    user.telefone = req.body.telefone;
    user.password = bcrypt.hashSync(req.body.password, null, null);
    connection.query("UPDATE tb_usuario SET nome = ?, telefone = ?, password = ? WHERE id = ?", [user.nome, user.telefone, user.password, user.id], function(err, rows) {
      if (err)
        console.log(err);
      req.flash('profileMessage', 'Dados alterados com sucesso');
      res.redirect('/profile');
    });
  });

  app.get('/form', isLoggedIn, function(req, res) {
    var sql = "SELECT * FROM tb_participacao;SELECT * FROM tb_categoria;SELECT * FROM tb_marca;SELECT * FROM tb_cor;SELECT * FROM tb_combustivel;SELECT * FROM tb_tipo";
    connection.query(sql, function(err, rows) {
      if (err)
        console.log(err);
      res.render('form.ejs', {
        user: req.user,
        message: req.flash('formMessage'),
        participacao: rows[0],
        categoria: rows[1],
        marca: rows[2],
        cor: rows[3],
        combustivel: rows[4],
        tipo: rows[5]
      });
    });
  });

  app.post('/form', isLoggedIn, function(req, res) {
    sucata = false;
    sinistro = false;
    cor = null;
    marca = null;
    categoria = null;
    anoini = null;
    anofim = null;
    if (req.body.sucata == 'on')
      sucata = true;
    if (req.body.sinistro == 'on')
      sinistro = true;
    if (req.body.cor.length)
      cor = req.body.cor;
    if (req.body.marca.length)
      marca = req.body.marca;
    if (req.body.categoria.length)
      categoria = req.body.categoria;
    if (req.body.anoini.length)
      anoini = req.body.anoini;
    if (req.body.anofim.length)
      anofim = req.body.anofim;

    connection.query("INSERT INTO tb_formulario (id_usuario,id_marca,id_cor,id_categoria,id_participacao,cilindrada,ano_inicio,ano_fim,modelo,lance_min,lance_max,avaliacao_min,avaliacao_max,sucata,sinistro,info_adicional,data_envio) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())", [req.user.id, marca, cor, categoria, req.body.participacao, req.body.cilindrada, anoini, anofim, req.body.modelo, req.body.lancemin.replace(/\./g, '').replace(',', '.'), req.body.lancemax.replace(/\./g, '').replace(',', '.'), req.body.avaliacaomin.replace(/\./g, '').replace(',', '.'), req.body.avaliacaomax.replace(/\./g, '').replace(',', '.'), sucata, sinistro, req.body.infoadd], function(err, rows) {
      if (err)
        console.log(err);

      sql = '';
      if (req.body.alcool == 'on')
        sql = 'INSERT INTO tb_formulario_combustivel (id_formulario, id_combustivel) VALUES (' + rows.insertId + ',1);';
      if (req.body.gasolina == 'on')
        sql += 'INSERT INTO tb_formulario_combustivel (id_formulario, id_combustivel) VALUES (' + rows.insertId + ',2);';
      if (req.body.diesel == 'on')
        sql += 'INSERT INTO tb_formulario_combustivel (id_formulario, id_combustivel) VALUES (' + rows.insertId + ',3);';
      if (req.body.flex == 'on')
        sql += 'INSERT INTO tb_formulario_combustivel (id_formulario, id_combustivel) VALUES (' + rows.insertId + ',4);';

      if (req.body.passeio == 'on')
        sql += 'INSERT INTO tb_formulario_tipo (id_formulario, id_tipo) VALUES (' + rows.insertId + ',1);';
      if (req.body.conversivel == 'on')
        sql += 'INSERT INTO tb_formulario_tipo (id_formulario, id_tipo) VALUES (' + rows.insertId + ',2);';
      if (req.body.pickup == 'on')
        sql += 'INSERT INTO tb_formulario_tipo (id_formulario, id_tipo) VALUES (' + rows.insertId + ',3);';
      if (req.body.suv == 'on')
        sql += 'INSERT INTO tb_formulario_tipo (id_formulario, id_tipo) VALUES (' + rows.insertId + ',4);';
      if (req.body.antigo == 'on')
        sql += 'INSERT INTO tb_formulario_tipo (id_formulario, id_tipo) VALUES (' + rows.insertId + ',5);';
      if (sql.length) {
        connection.query(sql, function(err, rows) {
          if (err)
            console.log(err);
        });
      }
      req.flash('formMessage', "Formulário enviado com sucesso! Em breve entraremos em contato.");
      res.redirect('/form');
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/relatorio', isLoggedIn, function(req, res) {
    if (req.user.id == 1) {
      connection.query("SELECT tb_formulario.id, tb_formulario.data_envio, tb_usuario.nome FROM tb_formulario INNER JOIN tb_usuario ON tb_formulario.id_usuario = tb_usuario.id;", function(err, rows) {
        if (err)
          console.log(err);
        for (var i = 0; i < rows.length; i++) {
          rows[i].data_envio = dateFormat(rows[0].data_envio, "yyyy-mm-dd");
        };
        res.render('relatorio.ejs', {
          user: req.user,
          lista: rows
        });
      });
    } else {
      res.redirect('/');
    }
  });

  app.get('/relatorio/:id', isLoggedIn, function(req, res) {
    if (req.user.id == 1) {
      var id = req.params.id;
      connection.query("SELECT tb_formulario.cilindrada, tb_formulario.info_adicional, tb_formulario.ano_inicio, tb_formulario.ano_fim, tb_formulario.modelo, tb_formulario.lance_min, tb_formulario.lance_max, tb_formulario.avaliacao_min, tb_formulario.avaliacao_max, tb_formulario.sucata, tb_formulario.sinistro, tb_formulario.data_envio, tb_usuario.nome, tb_marca.descricao AS marca, tb_cor.descricao AS cor, tb_categoria.descricao as categoria, tb_participacao.descricao as participacao FROM tb_formulario INNER JOIN tb_usuario ON tb_formulario.id_usuario = tb_usuario.id INNER JOIN tb_marca ON tb_formulario.id_marca = tb_marca.id INNER JOIN tb_cor ON tb_formulario.id_cor = tb_cor.id INNER JOIN tb_categoria ON tb_formulario.id_categoria = tb_categoria.id INNER JOIN tb_participacao ON tb_formulario.id_participacao = tb_participacao.id where tb_formulario.id = ?;SELECT * FROM tb_formulario_combustivel WHERE id_formulario = ?;SELECT * FROM tb_formulario_tipo WHERE id_formulario = ?;", [id, id, id], function(err, rows) {
        if (err)
          console.log(err);
        rows[0].forEach(function(item) {
          item.data_envio = dateFormat(rows.data_envio, "yyyy-mm-dd");
          item.lance_min = formatReal(item.lance_min);
          item.lance_max = formatReal(item.lance_max);
          item.avaliacao_min = formatReal(item.avaliacao_min);
          item.avaliacao_max = formatReal(item.avaliacao_max);
        });
        var data = {
          alcool: 0,
          gasolina: 0,
          diesel: 0,
          flex: 0,
          passeio: 0,
          conversivel: 0,
          pickup: 0,
          suv: 0,
          antigo: 0
        };
        rows[1].forEach(function(item) {
          if (item.id_combustivel == 1)
            data.alcool = 1;
          if (item.id_combustivel == 2)
            data.gasolina = 1;
          if (item.id_combustivel == 3)
            data.diesel = 1;
          if (item.id_combustivel == 4)
            data.flex = 1;
        });
        rows[2].forEach(function(item) {
          if (item.id_tipo == 1)
            data.passeio = 1;
          if (item.id_tipo == 2)
            data.conversivel = 1;
          if (item.id_tipo == 3)
            data.pickup = 1;
          if (item.id_tipo == 4)
            data.suv = 1;
          if (item.id_tipo == 5)
            data.antigo = 1;
        });
        res.render('formrel.ejs', {
          user: req.user,
          data: data,
          dataForm: rows[0][0]
        });
      });
    } else {
      res.redirect('/');
    }
  });

  app.get('/usuarios', isLoggedIn, function(req, res) {
    if (req.user.id == 1) {
      connection.query("SELECT id, nome, telefone, email FROM tb_usuario WHERE id >= 2;", function(err, rows) {
        if (err)
          console.log(err);
        res.render('usuarios.ejs', {
          user: req.user,
          lista: rows
        });
      });
    } else {
      res.redirect('/');
    }
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

function formatReal( int ){
  var tmp = int+'';
  if (!tmp.includes('.'))
    tmp = tmp + '.00';
  tmp = tmp.replace(/\./g, ',');
  return tmp;
}
