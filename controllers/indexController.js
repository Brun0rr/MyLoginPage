var usuarioModel = require('../models/usuarioModel')();
var formModel = require('../models/formModel')();
var relatorioModel = require('../models/relatorioModel')();
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');

module.exports.login = function(req, res) {
  res.render('login.ejs', {
    message: req.flash('loginMessage'),
    user: req.user,
  });
};

module.exports.loginPost = function(req, res) {
  if (req.body.remember) {
    req.session.cookie.maxAge = 1000 * 60 * 3;
  } else {
    req.session.cookie.expires = false;
  }
  res.redirect('/');
};

module.exports.signup = function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('signup.ejs', {
      message: req.flash('signupMessage'),
      user: req.user
    });
  }
};

module.exports.signupPost = function(req, res) {
  var data = {
    nome: req.body.nome,
    telefone: req.body.telefone,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, null, null) // use the generateHash function in our user model
  };
  usuarioModel.findByEmail(data.email, function(err, rows) {
    if (err)
      console.log(err);
    if (rows.length) {
      req.flash('signupMessage', 'E-mail já cadastrado');
      res.redirect('/signup');
    } else {
      usuarioModel.insert(data, function(err, rows){
        if (err)
          console.log(err);
        res.redirect('/login');
      });
    }
  });
};

module.exports.profile = function(req, res) {
  res.render('profile.ejs', {
    user: req.user,
    message: req.flash('profileMessage')
  });
};

module.exports.profilePost = function(req, res) {
  user = req.user;
  user.nome = req.body.nome;
  user.telefone = req.body.telefone;
  user.password = bcrypt.hashSync(req.body.password, null, null);
  usuarioModel.update(user, function(err, rows){
    if (err)
      console.log(err);
    req.flash('profileMessage', 'Dados alterados com sucesso');
    res.redirect('/profile');
  });
};

module.exports.form = function(req, res) {
  formModel.findAllForm(function(err, rows){
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
};

module.exports.formPost = function(req, res) {
  var data = {
    id: req.user.id,
    participacao: req.body.participacao,
    cilindrada: req.body.cilindrada,
    modelo: req.body.modelo,
    lancemin: req.body.lancemin.replace(/\./g, '').replace(',', '.'),
    lancemax: req.body.lancemax.replace(/\./g, '').replace(',', '.'),
    avaliacaomin: req.body.avaliacaomin.replace(/\./g, '').replace(',', '.'),
    avaliacaomax: req.body.avaliacaomax.replace(/\./g, '').replace(',', '.'),
    infoadd: req.body.infoadd,
    sucata: false,
    sinistro: false,
    cor: null,
    marca: null,
    categoria: null,
    anoini: null,
    anofim: null
  };
  if (req.body.sucata == 'on')
    data.sucata = true;
  if (req.body.sinistro == 'on')
    data.sinistro = true;
  if (req.body.cor.length)
    data.cor = req.body.cor;
  if (req.body.marca.length)
    data.marca = req.body.marca;
  if (req.body.categoria.length)
    data.categoria = req.body.categoria;
  if (req.body.anoini.length)
    data.anoini = req.body.anoini;
  if (req.body.anofim.length)
    data.anofim = req.body.anofim;

  formModel.insertForm(data, req, function(err, rows) {
    var sql = '';
    if (err)
      console.log(err);
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
      formModel.insertCombustivelAndTipo(sql, function(err, rows){
        if (err)
          console.log(err);
      });
    }
    req.flash('formMessage', "Formulário enviado com sucesso! Em breve entraremos em contato.");
    res.redirect('/form');
  });
};

module.exports.relatorio = function(req, res) {
  if (req.user.id == 1) {
    relatorioModel.findAllRelatorios(function(err, rows) {
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
};

module.exports.relatorioById = function(req, res) {
  if (req.user.id == 1) {
    relatorioModel.findRelatorioById(req.params.id, function(err, rows) {
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
};

module.exports.usuarios = function(req, res) {
  if (req.user.id == 1) {
    usuarioModel.findAll(function(err, rows) {
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
};

// route middleware to make sure
module.exports.isLoggedIn = function(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
};

function formatReal(int) {
  var tmp = int + '';
  if (!tmp.includes('.'))
    tmp = tmp + '.00';
  tmp = tmp.replace(/\./g, ',');
  return tmp;
}
