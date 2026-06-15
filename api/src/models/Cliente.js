const mongoose = require('mongoose');

const Cliente = mongoose.model('Cliente', {
    nome: String,
    email: String,
    nascimento: Date
});
module.exports = Cliente;
