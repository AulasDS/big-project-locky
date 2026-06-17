const filtroSelect = document.getElementById('genero');
const filmes = document.querySelectorAll('#grade-principal .cartao-filme');

filtroSelect.addEventListener('change', function() {
    const generoSelecionado = filtroSelect.value; 
    filmes.forEach(filme => {
        const generoDoFilme = filme.getAttribute('data-genero');
        if (generoSelecionado === 'todos' || generoDoFilme === generoSelecionado) {
            filme.style.display = 'block'; 
        } else {
            filme.style.display = 'none'; 
        }
    });
});

const telaPerfis = document.getElementById('tela-perfis');
const telaHome = document.getElementById('tela-home');
const telaDetalhes = document.getElementById('tela-detalhes');
const telaPlayer = document.getElementById('tela-player');
const videoIframe = document.getElementById('video-iframe');

const gradePrincipal = document.getElementById('grade-principal');
const gradeMinhaLista = document.getElementById('grade-minha-lista');
const tituloSecao = document.getElementById('titulo-secao');
const containerFiltro = document.getElementById('container-filtro-genero');
const btnVoltarDaLista = document.getElementById('btn-voltar-da-lista');

// Variáveis de estado globais
let perfilAtivo = ""; 
let filmeAtualId = "";
let filmeAtualDados = {};
const historicoAvaliacoes = {};
let notaSelecionada = 0;
let visualizandoMinhaLista = false;

// Banco de dados dinâmico de listas separado por nome do perfil
const listasPorPerfil = {
    "Locky": [],
    "Infantil": [],
    "Amigo": []
};

function entrarNoSite(nomeDoPerfil) {
    perfilAtivo = nomeDoPerfil; 
    telaPerfis.classList.add('oculto');
    telaHome.classList.remove('oculto');
    voltarParaHome();
}

function deslogarPerfil() {
    perfilAtivo = ""; 
    telaHome.classList.add('oculto');
    telaDetalhes.style.display = 'none';
    telaPerfis.classList.remove('oculto');
}

function abrirDetalhes(titulo, sinopse, classificacao, duracao, imgUrl, posterCatalogoUrl) {
    filmeAtualId = titulo;
    filmeAtualDados = { titulo, sinopse, classificacao, duracao, imgUrl, posterCatalogoUrl };
    
    document.getElementById('detalhe-titulo').innerText = titulo;
    document.getElementById('detalhe-sinopse').innerText = sinopse;
    document.getElementById('detalhe-classificacao').innerText = classificacao;
    document.getElementById('detalhe-duracao').innerText = duracao;
    document.getElementById('detalhe-img').src = imgUrl;

    document.getElementById('mensagem-sucesso').classList.add('oculto');

    const btnLista = document.getElementById('btn-lista-toggle');
    const listaDoPerfil = listasPorPerfil[perfilAtivo] || [];
    
    if (listaDoPerfil.some(f => f.titulo === filmeAtualId)) {
        btnLista.innerText = "✓ Na Minha Lista";
    } else {
        btnLista.innerText = "+ Minha Lista";
    }

    if (historicoAvaliacoes[filmeAtualId]) {
        notaSelecionada = historicoAvaliacoes[filmeAtualId].nota;
        document.getElementById('campo-comentario').value = historicoAvaliacoes[filmeAtualId].comentario;
    } else {
        notaSelecionada = 0;
        document.getElementById('campo-comentario').value = "";
    }
    atualizarEstrelasVisuais(notaSelecionada);

    telaHome.classList.add('oculto');
    telaDetalhes.style.display = 'block';
    window.scrollTo(0, 0);
}

function voltarParaCatalogoAnterior() {
    telaDetalhes.style.display = 'none';
    telaHome.classList.remove('oculto');
    window.scrollTo(0, 0);
}

function voltarParaHome() {
    visualizandoMinhaLista = false;
    tituloSecao.innerText = "Filmes Disponíveis";
    containerFiltro.style.display = "block";
    btnVoltarDaLista.classList.add('oculto'); 
    gradePrincipal.classList.remove('oculto');
    gradeMinhaLista.classList.add('oculto');
    telaDetalhes.style.display = 'none';
    telaHome.classList.remove('oculto');
    window.scrollTo(0, 0);
}

function abrirMinhaLista() {
    visualizandoMinhaLista = true;
    tituloSecao.innerText = `Minha Lista de ${perfilAtivo}`;
    containerFiltro.style.display = "none"; 
    btnVoltarDaLista.classList.remove('oculto'); 
    gradePrincipal.classList.add('oculto');
    gradeMinhaLista.classList.remove('oculto');
    telaDetalhes.style.display = 'none';
    telaHome.classList.remove('oculto');
    window.scrollTo(0, 0);
    
    renderizarMinhaLista();
}

function alternarMinhaLista() {
    const btnLista = document.getElementById('btn-lista-toggle');
    const listaDoPerfil = listasPorPerfil[perfilAtivo];
    const index = listaDoPerfil.findIndex(f => f.titulo === filmeAtualId);

    if (index > -1) {
        listaDoPerfil.splice(index, 1);
        btnLista.innerText = "+ Minha Lista";
    } else {
        listaDoPerfil.push(filmeAtualDados);
        btnLista.innerText = "✓ Na Minha Lista";
    }
}

function renderizarMinhaLista() {
    gradeMinhaLista.innerHTML = "";
    const listaDoPerfil = listasPorPerfil[perfilAtivo] || [];
    
    if (listaDoPerfil.length === 0) {
        gradeMinhaLista.innerHTML = `<p style='color: #808080; padding-left: 5px; font-size: 15px;'>Nenhum filme salvo na lista de ${perfilAtivo} ainda.</p>`;
        return;
    }

    listaDoPerfil.forEach(filme => {
        const item = document.createElement('div');
        item.className = "cartao-filme";
        item.innerHTML = `
            <img src="${filme.posterCatalogoUrl}" alt="${filme.titulo}">
            <h3>${filme.titulo}</h3>
        `;
        item.onclick = () => abrirDetalhes(filme.titulo, filme.sinopse, filme.classificacao, filme.duracao, filme.imgUrl, filme.posterCatalogoUrl);
        gradeMinhaLista.appendChild(item);
    });
}

function abrirPlayer() {
    videoIframe.src = "https://www.youtube.com/embed/jfK7XTIbIdI?autoplay=1";
    telaPlayer.style.display = "block";
}

function fecharPlayer() {
    videoIframe.src = "";
    telaPlayer.style.display = "none";
}

function votarEstrela(qtd) {
    notaSelecionada = qtd;
    atualizarEstrelasVisuais(qtd);
}

// CORRIGIDO: Agora usa a variável correta "estrelas" e não quebra o código do clique!
function atualizarEstrelasVisuais(qtd) {
    const estrelas = document.querySelectorAll('.estrela');
    estrelas.forEach((estrela, index) => {
        if (index < qtd) {
            estrela.classList.add('ativa');
        } else {
            estrela.classList.remove('ativa');
        }
    });
}

function salvarAvaliacao() {
    const comentarioDigitado = document.getElementById('campo-comentario').value;
    historicoAvaliacoes[filmeAtualId] = {
        nota: notaSelecionada,
        comentario: comentarioDigitado
    };

    const msg = document.getElementById('mensagem-sucesso');
    msg.classList.remove('oculto');
    setTimeout(() => {
        msg.classList.add('oculto');
    }, 3000);
}