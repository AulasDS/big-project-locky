import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Filme {
    _id: string;
    nome: string;
    descricao: string;
}

export default function GerenciarCatalogo() {
    const [filmes, setFilmes] = useState<Filme[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3000/conteudo/").then(res => setFilmes(res.data.data));
    }, []);

    const excluir = async (id: string) => {
        if (confirm("Remover este filme do catálogo?")) {
            await axios.delete(`http://localhost:3000/conteudo/${id}`);
            setFilmes(filmes.filter(f => f._id !== id));
        }
    };

    return (
        <div className="container py-5 text-white" style={{ paddingTop: '100px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4" style={{ marginTop: '50px' }}>
                <h2>Gerenciar Catálogo (Admin)</h2>
                <Link to="/filme/novo" className="btn btn-danger fw-bold">Novo Filme/Série</Link>
            </div>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Sinopse</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filmes.map(f => (
                        <tr key={f._id}>
                            <td className="fw-bold">{f.nome}</td>
                            <td className="text-muted text-truncate" style={{ maxWidth: '400px' }}>{f.descricao}</td>
                            <td>
                                <Link to={`/filme/editar/${f._id}`} className="btn btn-sm btn-light me-2">Editar</Link>
                                <button onClick={() => excluir(f._id)} className="btn btn-sm btn-outline-danger">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}