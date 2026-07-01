const Conteudo = require('../models/Conteudo'); // O antigo 'Produto' agora é 'Conteudo'

class ConteudoController {
    // 1. Adicionar um novo Filme ou Série ao catálogo
    static async create(req, res) {
        try {
            const { 
                titulo, 
                sinopse, 
                tipo, 
                genero, 
                anoLancamento, 
                classificacaoIndicativa,
                duracao,
                imgUrl,
                posterCatalogoUrl,
                trailerUrl 
            } = req.body;
            
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
                classificacaoIndicativa,
                duracao,
                imgUrl,
                posterCatalogoUrl,
                trailerUrl
            };

            const newConteudo = await Conteudo.create(conteudoData);
            return res.status(201).json({ message: 'Conteúdo adicionado ao catálogo com sucesso', data: newConteudo });

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao adicionar conteúdo', error: error.message });
        }
    }

    // 2. Listar todos os conteúdos (com filtro por gênero opcional)
    static async getAll(req, res) {
        try {
            const { genero } = req.query; // Captura o ?genero=... da URL
            
            // Se o usuário passou um gênero, filtra por ele. Se não, traz tudo ({})
            const filtro = genero ? { genero: genero } : {}; 
            
            const conteudos = await Conteudo.find(filtro);
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

    // 4. Atualizar os dados de um Filme/Série
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { 
                titulo, 
                sinopse, 
                tipo, 
                genero, 
                anoLancamento, 
                classificacaoIndicativa,
                duracao,
                imgUrl,
                posterCatalogoUrl,
                trailerUrl 
            } = req.body;
            
            const updatedData = {
                titulo,
                sinopse,
                tipo,
                genero,
                anoLancamento,
                classificacaoIndicativa,
                duracao,
                imgUrl,
                posterCatalogoUrl,
                trailerUrl
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

    // 5. Salvar uma nova avaliação (Anônima) para o filme
    static async addAvaliacao(req, res) {
        try {
            const { id } = req.params; // ID do filme vindo da URL /conteudo/:id/avaliar
            const { nota, comentario } = req.body;

            if (!nota) {
                return res.status(400).json({ message: "A nota é obrigatória para registrar a avaliação." });
            }

            // Cria o objeto da avaliação sem depender de dados do usuario.js
            const novaAvaliacao = {
                nota: Number(nota),
                comentario: comentario || "",
                autor: "Visitante Anônimo", // Forçado como string padrão
                data: new Date()
            };

            // Dá um push na nova avaliação dentro do array 'avaliacoes' do documento do filme
            const conteudoAtualizado = await Conteudo.findByIdAndUpdate(
                id,
                { $push: { avaliacoes: novaAvaliacao } },
                { new: true }
            );

            if (!conteudoAtualizado) {
                return res.status(404).json({ message: 'Filme ou série não encontrado para avaliar.' });
            }

            return res.status(201).json({ 
                message: 'Avaliação anônima salva com sucesso!', 
                data: conteudoAtualizado 
            });

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao salvar a avaliação', error: error.message });
        }
    }

    // 6. Remover um Filme/Série do catálogo
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

module.exports = ConteudoController;