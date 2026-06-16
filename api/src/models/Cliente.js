const mongoose = require('mongoose');

// 1. Model da CONTA (O assinante)
const ContaSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    plano: { type: String, enum: ['Básico', 'Padrão', 'Premium'], default: 'Básico' },
    statusAssinatura: { type: String, default: 'Ativa' },
    dataCriacao: { type: Date, default: Date.now }
});

// 2. Model do PERFIL (Quem realmente assiste)
const PerfilSchema = new mongoose.Schema({
    contaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conta', required: true },
    nome: { type: String, required: true },
    avatar: { type: String, default: 'default_avatar.png' },
    classificacaoIndicativa: { type: String, default: 'L' }, // Livre, 10, 12, 14, 16, 18
    idiomaPreferencial: { type: String, default: 'PT-BR' }
});

const Conta = mongoose.model('Conta', ContaSchema);
const Perfil = mongoose.model('Perfil', PerfilSchema);

module.exports = { Conta, Perfil };