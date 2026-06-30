import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const data = await authService.login(form);

        setLoading(false);

        if (!data.ok) {
            setError(data.message || "Credenciais inválidas");
            return;
        }

        login(data.token, data.user);
        navigate("/");
    };

    return (
        <div className="auth-layout">
            <div className="auth-left">
                <div className="auth-left-content">
                    <h1>Vagas UFSC</h1>
                    <p>Conectando talentos às melhores oportunidades da região.</p>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-form-wrap">
                    <span className="auth-mobile-brand">Vagas UFSC</span>
                    <h2 className="auth-heading">Entrar na sua conta</h2>

                    {error && <p className="auth-error">{error}</p>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Sua senha"
                                required
                            />
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </form>

                    <p className="auth-link">
                        Não tem conta? <Link to="/register">Criar conta</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
