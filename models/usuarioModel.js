var db = require('../config/db');

module.exports = function(){

  this.insert = function(data, ret){
    var connection = db();
    connection.query("INSERT INTO tb_usuario ( nome, telefone, email, password ) values (?,?,?,?)", [data.nome, data.telefone, data.email, data.password], ret);
  }

  this.update = function(user, ret){
    var connection = db();
    connection.query("UPDATE tb_usuario SET nome = ?, telefone = ?, password = ? WHERE id = ?", [user.nome, user.telefone, user.password, user.id], ret);
  }

  this.findById = function(id, ret){
    var connection = db();
    connection.query("SELECT * FROM tb_usuario WHERE id = ?;", [id], ret);
  }

  this.findByEmail = function(email, ret){
    var connection = db();
    connection.query("SELECT * FROM tb_usuario WHERE email = ?;", [email], ret);
  }

  this.findAll = function(ret){
    var connection = db();
    connection.query("SELECT id, nome, telefone, email FROM tb_usuario WHERE id >= 2;", ret);
  }

  return this;
};
