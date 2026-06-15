const filtroSelect = document.getElementById('genero');
const filmes = document.querySelectorAll('.cartao-filme');

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

function entrarNoSite() {
    telaPerfis.classList.add('oculto');
    telaHome.classList.remove('oculto');
}

function deslogarPerfil() {
    telaHome.classList.add('oculto');
    telaDetalhes.style.display = 'none';
    telaPerfis.classList.remove('oculto');
}

function abrirDetalhes(titulo, sinopse, classificacao, duracao, imgUrl) {
    document.getElementById('detalhe-titulo').innerText = titulo;
    document.getElementById('detalhe-sinopse').innerText = sinopse;
    document.getElementById('detalhe-classificacao').innerText = classificacao;
    document.getElementById('detalhe-duracao').innerText = duracao;
    document.getElementById('detalhe-img').src = imgUrl;

    telaHome.style.display = 'none';
    telaDetalhes.style.display = 'block';
    window.scrollTo(0, 0);
}

function voltarParaHome() {
    telaDetalhes.style.display = 'none';
    telaHome.style.display = 'block';
}

function abrirPlayer() {
    videoIframe.src = "https://www.youtube.com/embed/jfK7XTIbIdI?autoplay=1";
    telaPlayer.style.display = "block";
}

function fecharPlayer() {
    videoIframe.src = "";
    telaPlayer.style.display = "none";
}

function deslogarPerfil() {
    telaHome.classList.add('oculto');
    telaDetalhes.style.display = 'none'; // Garante que a tela de detalhes feche também
    telaPerfis.classList.remove('oculto');
}