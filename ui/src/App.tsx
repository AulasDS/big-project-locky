import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Componentes Globais
import CatalogoHome from './pages/CatalogoHome';
import GerenciarCatalogo from './pages/GerenciarCatalogo';
import FormularioFilme from './pages/FormularioFilme';
import MinhaLista from './pages/MinhaLista';

function App() {
  // Estado que controla qual perfil está ativo no topo do app
  const [perfilAtivo, setPerfilAtivo] = useState<string | null>(null);

  const logarPerfil = (nome: string) => {
    setPerfilAtivo(nome);
  };

  const deslogarPerfil = () => {
    setPerfilAtivo(null);
  };

  // ee nao tiver nenhum perfil selecionado, mostra a tela dos 3 perfis 
  if (!perfilAtivo) {
    return (
      <div className="telaPerfisGlobal">
        <div className="containerPerfisGlobal">
          <h2>Quem está assistindo?</h2>
          <div className="gradePerfisGlobal">
            <div className="perfilGlobal" onClick={() => logarPerfil('Donathan')}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Donathan" />
              <span>Donathan</span>
            </div>
            <div className="perfilGlobal" onClick={() => logarPerfil('Infantil')}>
              <img src="https://i.pinimg.com/474x/b4/0b/51/b40b51418293936a6e0ad09ffa229cb7.jpg" alt="Infantil" />
              <span>Infantil</span>
            </div>
            <div className="perfilGlobal" onClick={() => logarPerfil('Adulto')}>
              <img src="https://i.pinimg.com/474x/64/e1/eb/64e1eb2d17dd18e2bf04fab75f913c85.jpg" alt="Adulto" />
              <span>Adulto</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

// Se TIVER perfil selecionado, roda o catálogo normalmente e passa a função de deslogar (Sair)
  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh' }}>
      <Routes>
        {/* Adicionada a prop perfilAtivo aqui */}
        <Route path='/' element={<CatalogoHome aoSair={deslogarPerfil} perfilAtivo={perfilAtivo} />} />
        <Route path='/gerenciar' element={<GerenciarCatalogo />} />
        <Route path='/filme/novo' element={<FormularioFilme />} />
        <Route path='/filme/editar/:id' element={<FormularioFilme />} />
        <Route path='/minha-lista' element={<MinhaLista />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;