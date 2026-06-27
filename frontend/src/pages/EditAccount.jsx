import { useState } from "react";
import { userService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import "./EditAccount.css";

export default function EditAccount() {
    const { user, token, updateUser } = useAuth();

    const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (form.password && form.password.length < 6) {
            setError("A nova senha deve ter pelo menos 6 caracteres");
            return;
        }

        setLoading(true);

        const payload = { name: form.name, email: form.email };
        if (form.password) payload.password = form.password;

        const data = await userService.updateMe(token, payload);

        setLoading(false);

        if (!data.ok) {
            setError(data.message || "Erro ao atualizar conta");
            return;
        }

        updateUser(data);
        setSuccess("Conta atualizada com sucesso!");
        setForm({ ...form, password: "" });
    };

    return (
        <div className="edit-page">
            <Navbar />

            <main className="edit-main">
                <div className="edit-card">
                    <h2 className="edit-title">Editar conta</h2>
                    <p className="edit-role">{user?.role === "recruiter" ? "Recrutador" : "Candidato"}</p>

                    {error && <p className="edit-error">{error}</p>}
                    {success && <p className="edit-success">{success}</p>}

                    <form onSubmit={handleSubmit} className="edit-form">
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
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
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Nova senha <span className="optional">(opcional)</span>
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Deixe em branco para manter a atual"
                            />
                        </div>

                        <button type="submit" className="edit-btn" disabled={loading}>
                            {loading ? "Salvando..." : "Salvar alterações"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
