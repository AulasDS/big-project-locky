import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';

interface NavBarProps {
    onLogout: () => void;
}

export default function NavBar({ onLogout }: NavBarProps) {
    const [pesquisa, setPesquisa] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (pesquisa.trim()) {
            navigate(`/?search=${pesquisa}`);
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <Link to="/" className={styles.logo}>NETFLIX</Link>
                    <ul className={styles.navList}>
                        <li><Link className={styles.navLink} to="/">Início</Link></li>
                        <li><Link className={styles.navLink} to="/minha-lista">Minha Lista</Link></li>
                    </ul>
                </div>

                {/* Centralizado na Barra */}
                <div className={styles.centerSide}>
                    <form onSubmit={handleSearch} className={styles.searchBox}>
                        <input 
                            type="text" 
                            placeholder="Pesquisar títulos..." 
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                            className={styles.searchInput}
                        />
                    </form>
                </div>

                <div className={styles.rightSide}>
                    <button onClick={onLogout} className={styles.profileBtn}>
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    );
}