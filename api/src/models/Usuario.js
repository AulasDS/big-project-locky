const mongoose = require('mongoose'); // importa biblioteca

const Produto = mongoose.model('Produto', {
    nome: String,
    preco: Number,
    quantidade: Number,
    descricao: String
});

module.exports = Produto;
