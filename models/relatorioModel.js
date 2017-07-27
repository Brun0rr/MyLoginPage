var db = require('../config/db');

module.exports = function(){

  this.findAllRelatorios = function(ret){
    var connection = db();
    connection.query("SELECT tb_formulario.id, tb_formulario.data_envio, tb_usuario.nome FROM tb_formulario INNER JOIN tb_usuario ON tb_formulario.id_usuario = tb_usuario.id;", ret);
  }

  this.findRelatorioById = function(id, ret){
    var connection = db();
    connection.query("SELECT tb_formulario.cilindrada, tb_formulario.info_adicional, tb_formulario.ano_inicio, tb_formulario.ano_fim, tb_formulario.modelo, tb_formulario.lance_min, tb_formulario.lance_max, tb_formulario.avaliacao_min, tb_formulario.avaliacao_max, tb_formulario.sucata, tb_formulario.sinistro, tb_formulario.data_envio, tb_usuario.nome, tb_marca.descricao AS marca, tb_cor.descricao AS cor, tb_categoria.descricao AS categoria, tb_participacao.descricao AS participacao FROM tb_formulario INNER JOIN tb_usuario ON tb_formulario.id_usuario = tb_usuario.id INNER JOIN tb_marca ON tb_formulario.id_marca = tb_marca.id INNER JOIN tb_cor ON tb_formulario.id_cor = tb_cor.id INNER JOIN tb_categoria ON tb_formulario.id_categoria = tb_categoria.id INNER JOIN tb_participacao ON tb_formulario.id_participacao = tb_participacao.id where tb_formulario.id = ?;SELECT * FROM tb_formulario_combustivel WHERE id_formulario = ?;SELECT * FROM tb_formulario_tipo WHERE id_formulario = ?;", [id, id, id], ret);
  }

  return this;
};
