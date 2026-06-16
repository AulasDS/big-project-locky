const Conteudo = require('../models/Conteudo'); // O antigo 'Produto' agora é 'Conteudo'

class ConteudoController {
    // 1. Adicionar um novo Filme ou Série ao catálogo
    static async create(req, res) {
        try {
            const { titulo, sinopse, tipo, genero, anoLancamento, classificacaoIndicativa } = req.body;
            
            if (!titulo || !sinopse || !tipo || !genero) {
                return res.status(400).json({ 
                    message: "Dados inválidos. Certifique-se de enviar titulo, sinopse, tipo (Filme/Série) e genero." 
                });
            }

            const conteudoData = {
                titulo,
                sinopse,
                tipo,
                genero,
                anoLancamento,
                classificacaoIndicativa
            };

            const newConteudo = await Conteudo.create(conteudoData);
            return res.status(201).json({ message: 'Conteúdo adicionado ao catálogo com sucesso', data: newConteudo });

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao adicionar conteúdo', error: error.message });
        }
    }

    // 2. Listar todo o catálogo
    static async getAll(req, res) {
        try {
            // Em uma API real, você adicionaria paginação aqui (limite de itens por página)
            const conteudos = await Conteudo.find();
            return res.status(200).json({ data: conteudos });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar o catálogo', error: error.message });
        }
    }

    // 3. Buscar os detalhes de um Filme/Série específico
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const conteudo = await Conteudo.findById(id);
            
            if (!conteudo) {
                return res.status(404).json({ message: 'Conteúdo não encontrado no catálogo' });
            }
            return res.status(200).json({ data: conteudo });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar os detalhes do conteúdo', error: error.message });
        }
    }

    // 4. Atualizar os dados de um Filme/Série (Ex: Mudar a sinopse ou classificação)
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { titulo, sinopse, tipo, genero, anoLancamento, classificacaoIndicativa } = req.body;
            
            const updatedData = {
                titulo,
                sinopse,
                tipo,
                genero,
                anoLancamento,
                classificacaoIndicativa
            };
            
            // Remove as chaves undefined caso nem todos os dados sejam enviados no update
            Object.keys(updatedData).forEach(key => updatedData[key] === undefined && delete updatedData[key]);
            
            const updatedConteudo = await Conteudo.findByIdAndUpdate(id, updatedData, { new: true });
            
            if (!updatedConteudo) {
                return res.status(404).json({ message: 'Conteúdo não encontrado' });
            }
            return res.status(200).json({ message: 'Conteúdo atualizado com sucesso', data: updatedConteudo });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar o conteúdo', error: error.message });
        }
    }

    // 5. Remover um Filme/Série do catálogo (Ex: Fim do contrato de licenciamento)
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedConteudo = await Conteudo.findByIdAndDelete(id);
            
            if (!deletedConteudo) {
                return res.status(404).json({ message: 'Conteúdo não encontrado' });
            }
            return res.status(200).json({ message: 'Conteúdo removido do catálogo com sucesso' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao remover o conteúdo', error: error.message });
        }
    }
}

module.exports = Conte