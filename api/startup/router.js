const express = require('express');
const conteudoRouter = require('../src/routes/ConteudoRouter');
const historicoRouter = require('../src/routes/HistoricoRouter');

module.exports = (app) => {
    app.use(express.json());
    app.use('/conteudo', conteudoRouter);
    app.use('/historico', historicoRouter);
};
