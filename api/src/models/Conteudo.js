const mongoose = require('mongoose');

const ConteudoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    sinopse: { type: String, required: true },
    tipo: { type: String, required: true, enum: ['Filme', 'Série'] },
    genero: { type: String, required: true },
    anoLancamento: { type: String }, // Mantido como string para bater com o "ano" do front
    classificacaoIndicativa: { type: String, default: 'Livre' },
    duracao: { type: String },
    imgUrl: { type: String },
    posterCatalogoUrl: { type: String },
    trailerUrl: { type: String },
    dataCriacao: { type: Date, default: Date.now }
});

const Conteudo = mongoose.model('Conteudo', ConteudoSchema);

module.exports = { Conteudo };