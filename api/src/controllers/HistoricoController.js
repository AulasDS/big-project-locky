const Historico = require('../models/Historico'); // Antigo 'Compra'

class HistoricoController {
    // 1. Registrar que um perfil começou a assistir (ou atualizou o tempo de) um filme
    static async create(req, res) {
        try {
            const { perfilId, conteudoId, tempoAssistido } = req.body;
            
            if (!perfilId || !conteudoId || tempoAssistido === undefined) {
                return res.status(400).json({ 
                    message: "Dados inválidos. Envie perfilId, conteudoId e tempoAssistido (em segundos)." 
                });
            }

            const historicoData = {
                perfilId,
                conteudoId,
                tempoAssistido,
                ultimaVezAssistido: new Date()
            };

            // Em uma API real da Netflix, aqui faríamos um "Upsert": 
            // Se o histórico já existe, apenas atualiza o tempo. Se não, cria um novo.
            const newHistorico = await Historico.create(historicoData);
            
            return res.status(201).json({ 
                message: 'Progresso salvo com sucesso', 
                data: newHistorico 
            });

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao salvar histórico', error: error.message });
        }
    }

    // 2. Listar todo o histórico (Geralmente filtrado por Perfil no frontend)
    static async getAll(req, res) {
        try {
            const historicos = await Historico.find()
                .populate('perfilId', 'nome avatar') // Traz os dados do perfil (ex: Nome e Foto)
                .populate('conteudoId', 'titulo miniatura tipo'); // Traz os dados do filme/série
                
            return res.status(200).json({ data: historicos });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar histórico', error: error.message });
        }
    }

    // 3. Buscar o progresso de um filme específico no histórico
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const historico = await Historico.findById(id)
                .populate('perfilId', 'nome')
                .populate('conteudoId', 'titulo duracaoTotal');

            if (!historico) {
                return res.status(404).json({ message: 'Registro de histórico não encontrado' });
            }
            return res.status(200).json({ data: historico });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar registro', error: error.message });
        }
    }

    // 4. Atualizar o tempo assistido (Ex: Usuário pausou o filme)
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { tempoAssistido } = req.body; // Geralmente só atualizamos o tempo
            
            const updatedData = {
                tempoAssistido,
                ultimaVezAssistido: new Date()
            };

            const updatedHistorico = await Historico.findByIdAndUpdate(id, updatedData, { new: true });
            
            if (!updatedHistorico) {
                return res.status(404).json({ message: 'Registro não encontrado' });
            }
            return res.status(200).json({ 
                message: 'Progresso atualizado com sucesso', 
                data: updatedHistorico 
            });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar progresso', error: error.message });
        }
    }

    // 5. Remover do histórico (Ex: Opção "Ocultar do histórico de visualização")
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedHistorico = await Historico.findByIdAndDelete(id);
            
            if (!deletedHistorico) {
                return res.status(404).json({ message: 'Registro não encontrado' });
            }
            return res.status(200).json({ message: 'Conteúdo removido do histórico com sucesso' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao remover do histórico', error: error.message });
        }
    }
}

module.exports = HistoricoController;
