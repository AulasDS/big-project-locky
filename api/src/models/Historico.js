const mongoose = require('mongoose');

// Model do histórico
const HistoricoSchema = new mongoose.Schema({
    perfilId: { type: mongoose.Schema.Types.ObjectId, ref: 'Perfil', required: true },
    conteudoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conteudo', required: true },
    tempoAssistido: { type: Number, required: true, default: 0 },
    ultimaVezAssistido: { type: Date, default: Date.now }
});

const Historico = mongoose.model('Historico', HistoricoSchema);

module.exports = { Historico };