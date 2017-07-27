var db = require('../config/db');


module.exports = function(){

  this.insertForm = function(data, req, ret){
    var connection = db();
    connection.query(`INSERT INTO tb_formulario (
      id_usuario,
      id_marca,
      id_cor,
      id_categoria,
      id_participacao,
      cilindrada,
      ano_inicio,
      ano_fim,
      modelo,
      lance_min,
      lance_max,
      avaliacao_min,
      avaliacao_max,
      sucata,
      sinistro,
      info_adicional,
      data_envio)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())`, [data.id, data.marca, data.cor, data.categoria, data.participacao, data.cilindrada, data.anoini, data.anofim, data.modelo, data.lancemin, data.lancemax, data.avaliacaomin, data.avaliacaomax, data.sucata, data.sinistro, data.infoadd], ret);
  };

  this.findAllForm = function(ret){
    var connection = db();
    connection.query("SELECT * FROM tb_participacao;SELECT * FROM tb_categoria;SELECT * FROM tb_marca;SELECT * FROM tb_cor;SELECT * FROM tb_combustivel;SELECT * FROM tb_tipo", ret);
  };

  this.insertCombustivelAndTipo = function(sql, ret){
    var connection = db();
    connection.query(sql, ret);
  }
  return this;
};
