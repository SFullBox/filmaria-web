<<<<<<< HEAD
import { Link } from "react-router-dom";
import './header.css';

export default function Header(){
    return(
        <header>
            <Link to='/'            className="logo">Filmaria</Link>
            <Link to='/favorites'   className="favoritos">Salvos</Link>

=======
import { Link } from 'react-router-dom';
import './header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <Link to="/" className="logo">
                        <span className="logo-text">Filmaria</span>
                        <span className="logo-dot"></span>
                    </Link>
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/favoritos">Favoritos</Link>
                    </div>
                </nav>
            </div>
>>>>>>> 331786b (Commit alterações)
        </header>
    )
}