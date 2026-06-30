import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="navbar">
            <Link to="/" className="navbar-brand">Vagas UFSC</Link>
            <div className="navbar-actions">
                <span className="navbar-name">Olá, {user.name}</span>
                <Link to="/account" className="navbar-link">Minha conta</Link>
                <button className="navbar-logout" onClick={logout}>Sair</button>
            </div>
        </header>
    );
}
