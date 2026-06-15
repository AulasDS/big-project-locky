const express = require('express');
const produtoRouter = require('../src/routes/ProdutoRouter');
const clienteRouter = require('../src/routes/ClienteRouter');
const compraRouter = require('../src/routes/CompraRouter');

module.exports = (app) => {
    app.use(express.json());
    app.use('/produto', produtoRouter);
    app.use('/cliente', clienteRouter);
    app.use('/compra', compraRouter);
};
