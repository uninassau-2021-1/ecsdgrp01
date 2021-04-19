var express = require('express');
var router = express.Router();

const HandleDBMSMySQL = require('../config/database/HandleDBMSMySQL');

const banco = new HandleDBMSMySQL();

// Autenticacao
router.post('/', function (requisicao, resposta, next) {

  var erros = new Array()

  var dados = {
    usuario: requisicao.body.usuario,
    senha: requisicao.body.senha
  }

  // Verifica a quantidade de caracteres do usuario
  if (dados.usuario.length < 8) {
    erros.push("O usuário precisa ter no mínimo 8 caracteres.")
  }

  // Verifica se o usuario comeca com uma letra
  if (!(dados.usuario.charCodeAt(0) >= 97 && dados.usuario.charCodeAt(0) <= 122)) {
    erros.push("O usuário precisa começar com uma letra minúscula.")
  }

  // Verifica se todos os caracteres do usuario sao numeros ou minusculos 
  var i = 0
  for (let index = 0; index < dados.usuario.length; index++) {
    if (
      (dados.usuario.charCodeAt(index) >= 48 && dados.usuario.charCodeAt(index) <= 57) || (dados.usuario.charCodeAt(index) >= 97 && dados.usuario.charCodeAt(index) <= 122)) {
      i++
    }
  }
  if (i != dados.usuario.length) {
    erros.push("O usuário só pode ter números ou letras minúsculas.")
  }

  // Verifica a quantidade de caracteres da senha
  if (dados.senha.length < 8) {
    erros.push("A senha precisa ter no mínimo 8 caracteres.")
  }

  // Verifica se todos os caracteres da senha sao numeros ou maiusculos ou minusculos
  i = 0
  for (let index = 0; index < dados.senha.length; index++) {
    if ((dados.senha.charCodeAt(index) >= 48 && dados.senha.charCodeAt(index) <= 57) ||
      (dados.senha.charCodeAt(index) >= 65 && dados.senha.charCodeAt(index) <= 90) ||
      (dados.senha.charCodeAt(index) >= 97 && dados.senha.charCodeAt(index) <= 122)) {
      i++
    }
  }
  if (i != dados.senha.length) {
    erros.push("A senha só pode ter números, letras minúsculas ou letras maiúsculas.")
  }

  // Verifica os dados do usuario no banco
  if (erros.length === 0) {
    banco.query(`SELECT * FROM usuarios WHERE usuario = '${dados.usuario}'`,
    function (err, result) {
      if (result[0]) {
        if (result[0].usuario_bloqueado) {
          resposta.sendStatus(403);
        } else{
          banco.query(
            `SELECT * FROM usuarios WHERE usuario = '${dados.usuario}' AND senha = md5('${dados.senha}')`,
            function (err, result) {
              // Usuario e Senha corretos
              if (result[0]) {
                resposta.sendStatus(200);
              } else {
                resposta.sendStatus(401);
              }
            }
          );
        }
      } else {
        resposta.sendStatus(404);
      }
    }
  );
  } else {
    resposta.status(422);
    resposta.send(erros);
  }
});

// Bloquear usuario
router.post('/bloquear_usuario', function (requisicao, resposta, next) {

  var usuario = requisicao.body.usuario

  banco.query(`UPDATE usuarios SET usuario_bloqueado = 1 WHERE usuario = '${usuario}'`, function (err, result) {
    if (result.affectedRows) {
      resposta.sendStatus(200)
    } else {
      resposta.sendStatus(404)
    }
  });
});

module.exports = router;
