import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MinhaLista() {
    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        // Altere para a rota correta do seu backend (/historico) se necessário
        axios.get("http://localhost:3000/historico/")
            .then(res => setHistorico(res.data.data || []))
            .catch(() => setHistorico([]));
    }, []);

    return (
        <div className="container py-5 text-white" style={{ paddingTop: '120px' }}>
            <h2 className="mb-4" style={{ fontWeight: 700 }}>Minha Lista / Histórico</h2>
            {historico.length === 0 ? (
                <p className="text-muted">Você ainda não assistiu ou não adicionou nenhum título à sua lista.</p>
            ) : (
                <div className="row row-cols-2 row-cols-md-4 g-3">
                    {/* Renderização dinâmica dos itens consumidos aqui */}
                </div>
            )}
        </div>
    );
}