import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";

export default function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({ name: "", email: "", password: "", role: "candidate" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (form.password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres");
            return;
        }

        setLoading(true);

        const data = await authService.register(form);

        setLoading(false);

        if (!data.ok) {
            setError(data.message || "Erro ao cadastrar");
            return;
        }

        login(data.token, data.user);
        setRegistered(true);
        setTimeout(() => navigate("/"), 1500);
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
                    {registered ? (
                        <div className="auth-success-state">
                            <p>✓</p>
                            <p>Conta criada! Redirecionando...</p>
                        </div>
                    ) : (
                        <>
                            <span className="auth-mobile-brand">Vagas UFSC</span>
                            <h2 className="auth-heading">Criar sua conta</h2>

                            {error && <p className="auth-error">{error}</p>}

                            <form onSubmit={handleSubmit} className="auth-form">
                                <div className="form-group">
                                    <label htmlFor="name">Nome</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Seu nome completo"
                                        required
                                    />
                                </div>

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
                                        placeholder="Mínimo 6 caracteres"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role">Sou um</label>
                                    <select id="role" name="role" value={form.role} onChange={handleChange}>
                                        <option value="candidate">Candidato</option>
                                        <option value="recruiter">Recrutador</option>
                                    </select>
                                </div>

                                <button type="submit" className="auth-btn" disabled={loading}>
                                    {loading ? "Criando conta..." : "Criar conta"}
                                </button>
                            </form>

                            <p className="auth-link">
                                Já tem conta? <Link to="/login">Entrar</Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
