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
    trailerUrl: string; 
    ano: string; 
}

// Criamos uma interface para a estrutura de cada avaliação individual
interface Avaliacao {
    perfil: string;
    nota: number;
    comentario: string;
}

interface CatalogoHomeProps {
    aoSair: () => void;
    perfilAtivo: string; // Adicionado nas Props do componente
}

export default function CatalogoHome({ aoSair, perfilAtivo }: CatalogoHomeProps) {
   const filmesIniciais: Filme[] = [
    {
        id: 'o-chamado',
        titulo: 'O Chamado',
        genero: 'terror',
        classificacao: 'A14',
        duracao: '1h 55min',
        imgUrl: 'https://i.pinimg.com/736x/3b/36/99/3b3699ce5d3a8459fd17dcece60c2c7a.jpg',
        posterCatalogoUrl: 'https://i.pinimg.com/736x/3b/36/99/3b3699ce5d3a8459fd17dcece60c2c7a.jpg',
        sinopse: 'Uma jornalista decide investigar a misteriosa morte de sua sobrinha, que faleceu após assistir a uma fita de vídeo amaldiçoada que dizem causar a morte de quem a assiste em sete dias.',
        trailerUrl: 'https://www.youtube.com/embed/rK4FC_V0o1Q?autoplay=1',
        ano: '2006'
    },
    {
        id: 'invocacao-do-mal',
        titulo: 'Invocação do Mal',
        genero: 'terror',
        classificacao: 'A14',
        duracao: '1h 52min',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzCgZyfWzUNR3yBEcwNwGT8bWorUIZunh79UCLUEXaSg&s',
        posterCatalogoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzCgZyfWzUNR3yBEcwNwGT8bWorUIZunh79UCLUEXaSg&s',
        sinopse: 'Investigadores paranormais trabalham para ajudar uma família aterrorizada por uma presença sombria em sua fazenda isolada.',
        trailerUrl: 'https://www.youtube.com/embed/GQrrXceHn2E?autoplay=1',
        ano: '2013'
    },
    {
        id: 'gente-grande',
        titulo: 'Gente Grande',
        genero: 'comedia',
        classificacao: 'Livre',
        duracao: '1h 42min',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKuGNf4B5WGu-TWDnjA7_2-FrgxZAZ0KhOk6Eft_y6Jw&s',
        posterCatalogoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKuGNf4B5WGu-TWDnjA7_2-FrgxZAZ0KhOk6Eft_y6Jw&s',
        sinopse: 'Após a morte de seu treinador de basquete de infância, cinco amigos e suas famílias decidem passar o fim de semana do feriado juntos.',
        trailerUrl: 'https://www.youtube.com/embed/UObB2XGqi-Q?autoplay=1',
        ano: '2010'
    },
    {
        id: 'as-branquelas',
        titulo: 'As Branquelas',
        genero: 'comedia',
        classificacao: 'A12',
        duracao: '1h 49min',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLvNmzF-bAt4hylQzrjvvX2P66I-TkYPyizCmOXUmFrg&s=10',
        posterCatalogoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLvNmzF-bAt4hylQzrjvvX2P66I-TkYPyizCmOXUmFrg&s=10',
        sinopse: 'Dois agentes do FBI negros se disfarçam de herdeiras brancas da alta sociedade para desmascarar um plano de sequestro.',
        trailerUrl: 'https://www.youtube.com/embed/aeVkbNka9HM?autoplay=1',
        ano: '2004'
    },
    {
        id: 'atraves-da-minha-janela',
        titulo: 'Através da Minha Janela',
        genero: 'romance',
        classificacao: 'A16',
        duracao: '1h 53min',
        imgUrl: 'https://i.pinimg.com/736x/4b/4b/6a/4b4b6aa34905d24957b061b97fdb4a8e.jpg',
        posterCatalogoUrl: 'https://i.pinimg.com/736x/4b/4b/6a/4b4b6aa34905d24957b061b97fdb4a8e.jpg',
        sinopse: 'acompanha Raquel, uma jovem apaixonada secretamente por seu vizinho misterioso, Ares Hidalgo. Após descobrir que ele usa sua senha de Wi-Fi, Raquel o confronta, dando início a um jogo intenso de sedução, paixão e superação de diferenças.',
        trailerUrl: 'https://www.youtube.com/embed/gyd3X62IcEM?autoplay=1',
        ano: '2022'
    },
    {
        id: 'la-la-land',
        titulo: 'La La Land',
        genero: 'romance',
        classificacao: 'A12',
        duracao: '2h 8min',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/pt/c/c0/La_La_Land_%28filme%29.png',
        posterCatalogoUrl: 'https://upload.wikimedia.org/wikipedia/pt/c/c0/La_La_Land_%28filme%29.png',
        sinopse: 'Aspirante a atriz Mia e o pianista de jazz Sebastian se apaixonam em Los Angeles enquanto perseguem seus sonhos. À medida que o sucesso chega, eles enfrentam dilemas que testam seu relacionamento.',
        trailerUrl: 'https://www.youtube.com/embed/zXvgkkNMi-4?autoplay=1',
        ano: '2016'
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
    
    // Agora o histórico aceita um Array de Avaliações para cada ID de filme
    const [historicoAvaliacoes, setHistoricoAvaliacoes] = useState<Record<string, Avaliacao[]>>({});
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
        
        // Busca a lista de avaliações do filme
        const avaliacoesDoFilme = historicoAvaliacoes[filme.id] || [];
        // Vemos se o perfil logado no momento já tem uma avaliação nele
        const minhaAvaliacaoExistente = avaliacoesDoFilme.find(a => a.perfil === perfilAtivo);
        
        if (minhaAvaliacaoExistente) {
            setNotaSelecionada(minhaAvaliacaoExistente.nota);
            setComentario(minhaAvaliacaoExistente.comentario);
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

        const listaAntiga = historicoAvaliacoes[filmeAtual.id] || [];
        
        // Remove a avaliação anterior deste mesmo perfil (caso ele esteja editando)
        const listaFiltrada = listaAntiga.filter(a => a.perfil !== perfilAtivo);

        // Cria a nova avaliação contendo quem fez
        const novaAvaliacao: Avaliacao = {
            perfil: perfilAtivo,
            nota: notaSelecionada,
            comentario: comentario
        };

        setHistoricoAvaliacoes({
            ...historicoAvaliacoes,
            [filmeAtual.id]: [...listaFiltrada, novaAvaliacao]
        });

        setMostrarSucesso(true);
        setTimeout(() => setMostrarSucesso(false), 3000);
    };

    return (
        <div className={styles.appContainer}>

            {/* TELA PRINCIPAL DO CATÁLOGO */}
            {telaAtiva === 'home' && (
                <div className={styles.telaHome}>
                    <div className={styles.barraControlesCatalogo}>
                        <div className={styles.controlesEsquerda}>
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
                            {/* Mostra uma mensagem sutil indicando qual perfil está ativo na Navbar */}
                            <span className={styles.perfilLogadoNav}>Olá, {perfilAtivo}!</span>
                            
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
                                        <option value="romance">Romance</option>
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
                                <span className={styles.ano}>{filmeAtual.ano}</span>
                                <span className={styles.classificacaoEtaria}>{filmeAtual.classificacao}</span>
                                <span className={styles.duracao}>{filmeAtual.duracao}</span>
                            </div>

                            <p className={styles.sinopse}>{filmeAtual.sinopse}</p>

                            <div className={styles.botoesAcoes}>
                                <button className={styles.btnAssistir} onClick={() => setTelaAtiva('player')}>▶ Assistir Trailer</button>
                                <button className={styles.btnMinhaLista} onClick={() => alternarMinhaLista(filmeAtual)}>
                                    {minhaLista.some(f => f.id === filmeAtual.id) ? "✓ Na Minha Lista" : "+ Minha Lista"}
                                </button>
                            </div>

                            <div className={styles.secaoAvaliacao}>
                                <h3>Avaliações de Quem Assistiu</h3>
                                
                                <div className={styles.containerFormularioAvaliacao}>
                                    
                                    {/* Retângulo da esquerda que exibe TODAS as avaliações com Scroll Vertical */}
                                    <div className={styles.retanguloAvaliacaoSalva}>
                                        {historicoAvaliacoes[filmeAtual.id] && historicoAvaliacoes[filmeAtual.id].length > 0 ? (
                                            <div className={styles.listaScrollAvaliacoes}>
                                                {historicoAvaliacoes[filmeAtual.id].map((item, index) => (
                                                    <div key={index} className={styles.itemAvaliacaoCard}>
                                                        <div className={styles.cabecalhoCardAvaliacao}>
                                                            {/* Renderiza o nome do perfil dinamicamente */}
                                                            <span className={styles.nomePerfilAutor}>{item.perfil}</span>
                                                            <div className={styles.estrelasSalvas}>
                                                                {[1, 2, 3, 4, 5].map((estrela) => (
                                                                    <span 
                                                                        key={estrela}
                                                                        className={`${styles.estrelaSalva} ${item.nota >= estrela ? styles.ativa : ''}`}
                                                                    >
                                                                        ★
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className={styles.comentarioSalvo}>
                                                            {item.comentario || <em>Sem comentário escrito.</em>}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className={styles.semAvaliacaoText}>Nenhum perfil avaliou este filme ainda.</p>
                                        )}
                                    </div>

                                    {/* Formulário da direita para criar/editar a sua própria avaliação */}
                                    <div className={styles.formularioCampos}>
                                        <h4>Sua opinião ({perfilAtivo}):</h4>
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
                                            placeholder="Deixe sua nota e comentário sobre o filme..."
                                            value={comentario}
                                            onChange={(e) => setComentario(e.target.value)}
                                        />
                                        <button className={styles.btnSalvarAvaliacao} onClick={salvarAvaliacao}>
                                            Salvar Avaliação
                                        </button>
                                        {mostrarSucesso && <div className={styles.mensagemSucesso}>Sua avaliação foi salva!</div>}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TELA PLAYER */}
            {telaAtiva === 'player' && filmeAtual && (
                <div className={styles.secaoPlayer}>
                    <button className={styles.btnFecharPlayer} onClick={() => setTelaAtiva('detalhes')}>✕ Fechar</button>
                    <div className={styles.videoContainer}>
                        <iframe 
                            src={filmeAtual.trailerUrl} 
                            frameBorder="0" 
                            allow="autoplay; encrypted-media; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

        </div>
    );
}