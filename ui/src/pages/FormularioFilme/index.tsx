import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function FormularioFilme() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/conteudo/`)
                .then(res => {
                    const filme = res.data.data.find((f: any) => f._id === id);
                    if (filme) {
                        setNome(filme.nome);
                        setDescricao(filme.descricao);
                    }
                });
        }
    }, [id]);

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { nome, descricao };

        if (id) {
            await axios.put(`http://localhost:3000/conteudo/${id}`, payload); // Adapte para sua rota de PUT se houver
        } else {
            await axios.post("http://localhost:3000/conteudo/", payload);
        }
        navigate('/gerenciar');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center text-white" style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <form onSubmit={salvar} className="p-5 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.75)', width: '100%', maxWidth: '500px' }}>
                <h3 className="mb-4">{id ? 'Editar Filme' : 'Adicionar Filme'}</h3>
                <div className="mb-3">
                    <label className="form-label text-muted">Título</label>
                    <input type="text" className="form-control bg-dark text-white border-0" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="form-label text-muted">Sinopse (Descrição)</label>
                    <textarea className="form-control bg-dark text-white border-0" rows={4} value={descricao} onChange={e => setDescricao(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-danger w-100 fw-bold py-2" style={{ backgroundColor: '#E50914' }}>
                    {id ? 'Atualizar Título' : 'Cadastrar no Catálogo'}
                </button>
            </form>
        </div>
    );
}