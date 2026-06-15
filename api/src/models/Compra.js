const mongoose = require('mongoose');

const Compra = mongoose.model('Compra', {
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente' //com qual tabela vc esta relacionando
    },
    produtoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto'
    },
    quantidade: Number,
    data: { type: Date, default: Date.now() }
});

module.exports = Compra;
