const Usuario = require('../models/Usuario'); // O antigo 'Cliente' agora é 'Usuario' ou 'Conta'

class UsuarioController {
    static async create(req, res) {
        try {
            // Adaptado para os dados que a Netflix pede no cadastro
            const { email, senha, plano } = req.body;
            
            if (!email || !senha || !plano) {
                return res.status(400).json({ 
                    message: "Dados inválidos. Certifique-se de enviar email, senha e o plano escolhido (Básico, Padrão, Premium)." 
                });
            }

            const usuarioData = {
                email,
                senha, // Em uma API real, essa senha DEVE ser criptografada (ex: bcrypt) antes de salvar
                plano,
                statusAssinatura: 'Ativa',
                telasPermitidas: plano === 'Premium' ? 4 : (plano === 'Padrão' ? 2 : 1)
            };

            const newUsuario = await Usuario.create(usuarioData);
            

            newUsuario.senha = undefined; 

            return res.status(201).json({ message: 'Conta Netflix criada com sucesso!', data: newUsuario });

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar conta', error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
    
            const usuarios = await Usuario.find().select('-senha'); 
            return res.status(200).json({ data: usuarios });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar contas', error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findById(id).select('-senha');
            
            if (!usuario) {
                return res.status(404).json({ message: 'Conta não encontrada' });
            }
            return res.status(200).json({ data: usuario });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar conta', error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { email, plano, statusAssinatura } = req.body;
            
            const updatedData = {};
            if (email) updatedData.email = email;
            if (plano) {
                updatedData.plano = plano;
                updatedData.telasPermitidas = plano === 'Premium' ? 4 : (plano === 'Padrão' ? 2 : 1);
            }
            if (statusAssinatura) updatedData.statusAssinatura = statusAssinatura;
            
            const updatedUsuario = await Usuario.findByIdAndUpdate(id, updatedData, { new: true }).select('-senha');
            
            if (!updatedUsuario) {
                return res.status(404).json({ message: 'Conta não encontrada' });
            }
            return res.status(200).json({ message: 'Assinatura atualizada com sucesso', data: updatedUsuario });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar conta', error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            
           
            const deletedUsuario = await Usuario.findByIdAndDelete(id);
            
            if (!deletedUsuario) {
                return res.status(404).json({ message: 'Conta não encontrada' });
            }
            return res.status(200).json({ message: 'Conta excluída permanentemente' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao excluir conta', error: error.message });
        }
    }
}

module.exports = UsuarioController;