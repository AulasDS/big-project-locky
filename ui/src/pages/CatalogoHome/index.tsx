"use client";

import { useState, useEffect } from 'react';
import styles from './style.module.scss';

interface Filme {
    id: string;
    titulo: string;
    sinopse: string;
    classificacao: string;
    duracao: string;
    imgUrl: string;
    posterCatalogoUrl: string;
    genero: string;
}

// Recebe a função aoSair criada no App.tsx
interface CatalogoHomeProps {
    aoSair: () => void;
}

export default function CatalogoHome({ aoSair }: CatalogoHomeProps) {
    const filmesIniciais: Filme[] = [
        {
            id: 'o-chamado',
            titulo: 'O Chamado',
            genero: 'terror',
            classificacao: 'A14',
            duracao: '1h 55min',
            imgUrl: 'https://placehold.co/800x450/8b0000/ffffff?text=O+Chamado',
            posterCatalogoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4uB62UbQJKH0auZpCkfmqOUmiGup7lb-gmUlaI-cNQg&s=10',
            sinopse: 'Uma jornalista decide investigar a misteriosa morte de sua sobrinha, que faleceu após assistir a uma fita de vídeo amaldiçoada que dizem causar a morte de quem a assiste em sete dias.'
        },
        {
            id: 'invocacao-do-mal',
            titulo: 'Invocação do Mal',
            genero: 'terror',
            classificacao: 'A14',
            duracao: '1h 52min',
            imgUrl: 'https://placehold.co/800x450/5c0000/ffffff?text=Invocacao+do+Mal',
            posterCatalogoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzCgZyfWzUNR3yBEcwNwGT8bWorUIZunh79UCLUEXaSg&s',
            sinopse: 'Investigadores paranormais trabalham para ajudar uma família aterrorizada por uma presença sombria em sua fazenda isolada.'
        },
        {
            id: 'gente-grande',
            titulo: 'Gente Grande',
            genero: 'comedia',
            classificacao: 'Livre',
            duracao: '1h 42min',
            imgUrl: 'https://placehold.co/800x450/1f3a60/ffffff?text=Gente+Grande',
            posterCatalogoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKuGNf4B5WGu-TWDnjA7_2-FrgxZAZ0KhOk6Eft_y6Jw&s',
            sinopse: 'Após a morte de seu treinador de basquete de infância, cinco amigos e suas famílias decidem passar o fim de semana do feriado juntos.'
        },
        {
            id: 'as-branquelas',
            titulo: 'As Branquelas',
            genero: 'comedia',
            classificacao: 'A12',
            duracao: '1h 49min',
            imgUrl: 'https://placehold.co/800x450/0f2537/ffffff?text=As+Branquelas',
            posterCatalogoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLvNmzF-bAt4hylQzrjvvX2P66I-TkYPyizCmOXUmFrg&s=10',
            sinopse: 'Dois agentes do FBI negros se disfarçam de herdeiras brancas da alta sociedade para desmascarar um plano de sequestro.'
        }
    ];

    const [telaAtiva, setTelaAtiva] = useState<'home' | 'detalhes' | 'player'>('home');
    const [visualizandoMinhaLista, setVisualizandoMinhaLista] = useState<boolean>(false);
    
    const [filmes] = useState<Filme[]>(filmesIniciais);
    const [filmesFiltrados, setFilmesFiltrados] = useState<Filme[]>(filmesIniciais);
    const [generoSelecionado, setGeneroSelecionado] = useState<string>('todos');
    const [pesquisa, setPesquisa] = useState<string>('');
    const [minhaLista, setMinhaLista] = useState<Filme[]>([]);
    
    const [filmeAtual, setFilmeAtual] = useState<Filme | null>(null);
    const [notaSelecionada, setNotaSelecionada] = useState<number>(0);
    const [comentario, setComentario] = useState<string>('');
    const [historicoAvaliacoes, setHistoricoAvaliacoes] = useState<Record<string, { nota: number; comentario: string }>>({});
    const [mostrarSucesso, setMostrarSucesso] = useState<boolean>(false);

    useEffect(() => {
        let resultado = filmes;
        if (generoSelecionado !== 'todos') {
            resultado = resultado.filter(f => f.genero === generoSelecionado);
        }
        if (pesquisa.trim() !== '') {
            resultado = resultado.filter(f => f.titulo.toLowerCase().includes(pesquisa.toLowerCase()));
        }
        setFilmesFiltrados(resultado);
    }, [generoSelecionado, pesquisa, filmes]);

    const abrirDetalhes = (filme: Filme) => {
        setFilmeAtual(filme);
        const avaliacaoExistente = historicoAvaliacoes[filme.id];
        if (avaliacaoExistente) {
            setNotaSelecionada(avaliacaoExistente.nota);
            setComentario(avaliacaoExistente.comentario);
        } else {
            setNotaSelecionada(0);
            setComentario('');
        }
        setTelaAtiva('detalhes');
    };

    const alternarMinhaLista = (filme: Filme) => {
        if (minhaLista.some(f => f.id === filme.id)) {
            setMinhaLista(minhaLista.filter(f => f.id !== filme.id));
        } else {
            setMinhaLista([...minhaLista, filme]);
        }
    };

    const salvarAvaliacao = () => {
        if (!filmeAtual) return;
        setHistoricoAvaliacoes({
            ...historicoAvaliacoes,
            [filmeAtual.id]: { nota: notaSelecionada, comentario }
        });
        setMostrarSucesso(true);
        setTimeout(() => setMostrarSucesso(false), 3000);
    };

    return (
        <div className={styles.appContainer}>

            {/* TELA PRINCIPAL DO CATÁLOGO */}
            {telaAtiva === 'home' && (
                <div className={styles.telaHome}>
                    
              {/* NAV BAR REFEITA COM TUDO FUNCIONANDO */}
<div className={styles.barraControlesCatalogo}>
    <div className={styles.controlesEsquerda}>
        {/* TEXTO DA MARCA ADICIONADO PARA FICAR IGUAL ANTES */}
        <span className={styles.logoNetflix}>NETFLIX</span>
        
        <span 
            className={`${styles.abaLink} ${!visualizandoMinhaLista ? styles.abaAtiva : ''}`}
            onClick={() => setVisualizandoMinhaLista(false)}
        >
            Início
        </span>
        <span 
            className={`${styles.abaLink} ${visualizandoMinhaLista ? styles.abaAtiva : ''}`}
            onClick={() => setVisualizandoMinhaLista(true)}
        >
            Minha Lista
        </span>
    </div>

    <div className={styles.controlesDireita}>
        <input 
            type="text"
            placeholder="Pesquisar por nome..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className={styles.searchInputNav}
        />

        {!visualizandoMinhaLista && (
            <div className={styles.filtroContainer}>
                <label htmlFor="genero">Gênero: </label>
                <select 
                    id="genero" 
                    value={generoSelecionado} 
                    onChange={(e) => setGeneroSelecionado(e.target.value)}
                >
                    <option value="todos">Todos</option>
                    <option value="terror">Terror</option>
                    <option value="comedia">Comédia</option>
                </select>
            </div>
        )}
        
        <button className={styles.btnTrocarPerfil} onClick={aoSair}>
            Sair
        </button>
    </div>
</div>

                    <div className={styles.alinhamentoTituloBotao}>
                        <h2 className={styles.tituloPagina}>
                            {visualizandoMinhaLista ? "Minha Lista" : "Filmes Disponíveis"}
                        </h2>
                        {visualizandoMinhaLista && (
                            <button className={styles.botaoVoltar} onClick={() => setVisualizandoMinhaLista(false)}>
                                ← Voltar para o Início
                            </button>
                        )}
                    </div>

                    <main className={styles.gradeFilmes}>
                        {visualizandoMinhaLista ? (
                            minhaLista.length === 0 ? (
                                <p className={styles.emptyListText}>Nenhum filme salvo na sua lista ainda.</p>
                            ) : (
                                minhaLista.map(filme => (
                                    <div key={filme.id} className={styles.cartaoFilme} onClick={() => abrirDetalhes(filme)}>
                                        <img src={filme.posterCatalogoUrl} alt={filme.titulo} />
                                        <h3>{filme.titulo}</h3>
                                    </div>
                                ))
                            )
                        ) : (
                            filmesFiltrados.map(filme => (
                                <div key={filme.id} className={styles.cartaoFilme} onClick={() => abrirDetalhes(filme)}>
                                    <img src={filme.posterCatalogoUrl} alt={filme.titulo} />
                                    <h3>{filme.titulo}</h3>
                                </div>
                            ))
                        )}
                    </main>
                </div>
            )}

            {/* TELA DE DETALHES */}
            {telaAtiva === 'detalhes' && filmeAtual && (
                <div className={styles.secaoDetalhes}>
                    <button className={styles.botaoVoltar} onClick={() => setTelaAtiva('home')}>← Voltar</button>

                    <div className={styles.containerFilme}>
                        <div className={styles.bannerFilme}>
                            <img src={filmeAtual.imgUrl} alt={filmeAtual.titulo} />
                        </div>

                        <div className={styles.infoFilme}>
                            <h1 className={styles.tituloFilme}>{filmeAtual.titulo}</h1>

                            <div className={styles.metadados}>
                                <span className={styles.ano}>2026</span>
                                <span className={styles.classificacaoEtaria}>{filmeAtual.classificacao}</span>
                                <span className={styles.duracao}>{filmeAtual.duracao}</span>
                            </div>

                            <p className={styles.sinopse}>{filmeAtual.sinopse}</p>

                            <div className={styles.botoesAcoes}>
                                <button className={styles.btnAssistir} onClick={() => setTelaAtiva('player')}>▶ Assistir</button>
                                <button className={styles.btnMinhaLista} onClick={() => alternarMinhaLista(filmeAtual)}>
                                    {minhaLista.some(f => f.id === filmeAtual.id) ? "✓ Na Minha Lista" : "+ Minha Lista"}
                                </button>
                            </div>

                            <div className={styles.secaoAvaliacao}>
                                <h3>Deixe sua Avaliação</h3>
                                <div className={styles.estrelas}>
                                    {[1, 2, 3, 4, 5].map((estrela) => (
                                        <span 
                                            key={estrela}
                                            className={`${styles.estrela} ${notaSelecionada >= estrela ? styles.ativa : ''}`} 
                                            onClick={() => setNotaSelecionada(estrela)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <textarea 
                                    placeholder="Escreva um breve comentário sobre o filme..."
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                />
                                <button className={styles.btnSalvarAvaliacao} onClick={salvarAvaliacao}>
                                    Salvar Avaliação
                                </button>
                                {mostrarSucesso && <div className={styles.mensagemSucesso}>Avaliação salva com sucesso!</div>}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TELA PLAYER */}
            {telaAtiva === 'player' && (
                <div className={styles.secaoPlayer}>
                    <button className={styles.btnFecharPlayer} onClick={() => setTelaAtiva('detalhes')}>✕ Fechar</button>
                    <div className={styles.videoContainer}>
                        <iframe 
                            src="https://www.youtube.com/embed/jfK7XTIbIdI?autoplay=1" 
                            frameBorder="0" 
                            allow="autoplay; encrypted-media" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}