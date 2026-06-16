const mongoose = require('mongoose');

// 1. Model do conteudo
const ConteudoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    sinopse: { type: String, required: true },
    tipo: { type: String, required: true, enum: ['Filme', 'Série'] },
    genero: { type: String, required: true },
    anoLancamento: { type: Number },
    classificacaoIndicativa: { type: String, default: 'L' },
    dataCriacao: { type: Date, default: Date.now }
});

const Conteudo = mongoose.model('Conteudo', ConteudoSchema);

module.exports = { Conteudo };