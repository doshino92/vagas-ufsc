import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { notificationService } from "../services/api";
import "./Navbar.css";

export default function Navbar() {
    const { user, token, logout } = useAuth();
    const [unread, setUnread] = useState(0);

    useEffect(() => {
        notificationService.getAll(token).then((res) => {
            if (res.ok) setUnread(res.data.filter((n) => !n.read).length);
        });
    }, [token]);

    return (
        <header className="navbar">
            <Link to="/" className="navbar-brand">Vagas UFSC</Link>
            <div className="navbar-actions">
                <span className="navbar-name">Olá, {user.name}</span>
                {user.role === "candidate" && (
                    <Link to="/my-applications" className="navbar-link">Minhas candidaturas</Link>
                )}
                <Link to="/notifications" className="navbar-link navbar-notif">
                    🔔 Notificações
                    {unread > 0 && <span className="notif-count">{unread}</span>}
                </Link>
                <Link to="/account" className="navbar-link">Minha conta</Link>
                <button className="navbar-logout" onClick={logout}>Sair</button>
            </div>
        </header>
    );
}
