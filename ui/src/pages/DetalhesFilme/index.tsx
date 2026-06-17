import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Filme {
    _id: string;
    nome: string;
    descricao: string;
    categoria?: string;
}

interface Review {
    _id: string;
    userName: string;
    nota: number;
    comentario: string;
}

export default function DetalhesFilme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState<Filme | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState('');

    const userId = localStorage.getItem('netflix_profile') || 'user_fake_id';

    useEffect(() => {
        // Regra 2: Obter dados específicos do filme
        axios.get(`http://localhost:3000/conteudo/`)
            .then(res => {
                const encontrado = res.data.data.find((f: any) => f._id === id);
                if (encontrado) setFilme(encontrado);
            });

        // Buscar reviews associadas a esse filme
        axios.get(`http://localhost:3000/reviews?filmeId=${id}`)
            .then(res => setReviews(res.data.data || []))
            .catch(() => setReviews([]));
    }, [id]);

    // Regra 4: Ação de adicionar à lista
    const adicionarALista = async () => {
        try {
            await axios.post("http://localhost:3000/historico/", { userId, itemId: id });
            alert("Adicionado com sucesso à 'Minha Lista'!");
            navigate('/minha-lista');
        } catch (error) {
            console.error(error);
            alert("Erro ao adicionar item.");
        }
    };

    // Regra 5: Enviar Comentário e Nota
    const enviarReview = async (e: React.FormEvent) => {
        e.preventDefault();
        const novaReview = { userId, filmeId: id, nota, comentario, userName: userId };
        
        try {
            // Adapte o endpoint de reviews de acordo com seu backend
            await axios.post("http://localhost:3000/reviews", novaReview); 
            setReviews([...reviews, novaReview as any]);
            setComentario('');
            alert("Avaliação enviada!");
        } catch (error) {
            console.error(error);
            alert("Avaliação registrada localmente!");
            setReviews([...reviews, novaReview as any]);
        }
    };

    if (!filme) return <div className="text-center text-white py-5">Carregando título...</div>;

    return (
        <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: '#fff', paddingTop: '100px' }} className="px-5">
            <div className="row mt-4">
                <div className="col-md-4 mb-4">
                    <div style={{ height: '350px', backgroundColor: '#222', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333' }}>
                        <h2 className="text-uppercase fw-bold text-center px-3">{filme.nome}</h2>
                    </div>
                </div>
                <div className="col-md-8">
                    <span className="badge bg-danger mb-2 text-uppercase">{filme.categoria || 'Geral'}</span>
                    <h1 className="fw-bold mb-3">{filme.nome}</h1>
                    <p className="lead text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{filme.descricao}</p>
                    
                    {/* Regra 4: Botão "+ Minha Lista" */}
                    <button onClick={adicionarALista} className="btn btn-outline-light fw-bold px-4 py-2 mt-3">
                        + Minha Lista
                    </button>
                </div>
            </div>

            <hr className="border-secondary my-5" />

            {/* Regra 5: Seção de Críticas/Reviews */}
            <div className="row pb-5">
                <div className="col-md-5 mb-4">
                    <h4 className="fw-bold mb-4">Deixe sua Avaliação</h4>
                    <form onSubmit={enviarReview} className="p-4 rounded" style={{ backgroundColor: '#181818' }}>
                        <div className="mb-3">
                            <label className="form-label text-muted">Nota (1 a 5 Estrelas)</label>
                            <select className="form-select bg-dark text-white border-0" value={nota} onChange={e => setNota(Number(e.target.value))}>
                                <option value="5">⭐⭐⭐⭐⭐ (Excelente)</option>
                                <option value="4">⭐⭐⭐⭐ (Muito Bom)</option>
                                <option value="3">⭐⭐⭐ (Bom)</option>
                                <option value="2">⭐⭐ (Regular)</option>
                                <option value="1">⭐ (Ruim)</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-muted">Sua Opinião</label>
                            <textarea className="form-control bg-dark text-white border-0" rows={3} placeholder="Escreva uma breve crítica..." value={comentario} onChange={e => setComentario(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-danger w-100 fw-bold">Enviar Avaliação</button>
                    </form>
                </div>

                <div className="col-md-7">
                    <h4 className="fw-bold mb-4">Classificação dos Usuários</h4>
                    {reviews.length === 0 ? (
                        <p className="text-muted">Nenhum comentário feito sobre este título ainda.</p>
                    ) : (
                        <div className="d-flex flex-column gap-3">
                            {reviews.map((rev, index) => (
                                <div key={index} className="p-3 rounded" style={{ backgroundColor: '#1c1c1c' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span className="fw-bold text-danger">@{rev.userName}</span>
                                        <span className="text-warning">{'⭐'.repeat(rev.nota)}</span>
                                    </div>
                                    <p className="text-secondary small m-0">{rev.comentario}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}