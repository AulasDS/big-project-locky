const express = require('express');
const usuarioRouter = require('../src/routes/UsuarioRouter');
const conteudoRouter = require('../src/routes/ConteudoRouter');
const historicoRouter = require('../src/routes/HistoricoRouter');

module.exports = (app) => {
    app.use(express.json());
    app.use('/conteudo', conteudoRouter);
    app.use('/historico', historicoRouter);
    app.use('/usuario', usuarioRouter);
};
