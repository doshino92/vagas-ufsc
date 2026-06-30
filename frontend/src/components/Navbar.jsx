import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

function BellIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    );
}

function ChevronIcon({ open }) {
    return (
        <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

export default function Navbar() {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const initials = user?.name
        ? user.name.trim().split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
        : "?";

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleLogout() {
        setDropdownOpen(false);
        logout();
        navigate("/login");
    }

    return (
        <header className="navbar">
            <Link to="/" className="navbar-brand">Vagas UFSC</Link>

            <nav className="navbar-nav">
                {user?.role === "candidate" && (
                    <Link to="/my-applications" className="navbar-link">Minhas candidaturas</Link>
                )}

                <Link to="/notifications" className="navbar-icon-btn" title="Notificações">
                    <BellIcon />
                </Link>

                <div className="navbar-user" ref={dropdownRef}>
                    <button
                        className="navbar-avatar-btn"
                        onClick={() => setDropdownOpen(prev => !prev)}
                        aria-expanded={dropdownOpen}
                    >
                        <span className="navbar-avatar">{initials}</span>
                        <span className="navbar-username">{user?.name?.split(" ")[0]}</span>
                        <ChevronIcon open={dropdownOpen} />
                    </button>

                    {dropdownOpen && (
                        <div className="navbar-dropdown">
                            <div className="navbar-dropdown-header">
                                <p className="dropdown-name">{user?.name}</p>
                                <p className="dropdown-email">{user?.email}</p>
                            </div>
                            <div className="navbar-dropdown-divider" />
                            <Link
                                to="/account"
                                className="navbar-dropdown-item"
                                onClick={() => setDropdownOpen(false)}
                            >
                                Minha conta
                            </Link>
                            <button className="navbar-dropdown-item danger" onClick={handleLogout}>
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
