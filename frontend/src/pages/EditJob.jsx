import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";
import Navbar from "../components/Navbar";
import "../components/JobForm.css";

const initialState = {
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    modality: "",
    description: "",
};

export default function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadJob() {
            try {
                const job = await getJobById(id);
                if (!job) { navigate("/", { replace: true }); return; }
                setFormData({
                    title: job.title ?? "",
                    company: job.company ?? "",
                    location: job.location ?? "",
                    salary: job.salary ?? "",
                    type: job.type ?? "",
                    modality: job.modality ?? "",
                    description: job.description ?? "",
                });
            } catch {
                navigate("/", { replace: true });
            } finally {
                setLoading(false);
            }
        }
        loadJob();
    }, [id, navigate]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSalaryBlur(e) {
        const raw = e.target.value.replace(/R\$\s?/g, '').replace(/\./g, '').trim();
        const num = Number(raw.replace(',', '.'));
        if (raw !== '' && !isNaN(num) && num > 0) {
            setFormData((prev) => ({ ...prev, salary: 'R$ ' + Math.round(num).toLocaleString('pt-BR') }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (saving) return;

        setSaving(true);
        setError("");

        try {
            await updateJob(id, formData);
            navigate(`/jobs/${id}`, { replace: true });
        } catch (err) {
            setError(err?.message || "Não foi possível atualizar a vaga.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="jf-page">
                <Navbar />
                <div className="jf-main"><p>Carregando...</p></div>
            </div>
        );
    }

    return (
        <div className="jf-page">
            <Navbar />
            <div className="jf-main">
                <Link to={`/jobs/${id}`} className="jf-back">← Voltar</Link>

                <div className="jf-card">
                    <div className="jf-card-header">
                        <h2 className="jf-card-title">Editar vaga</h2>
                        <p className="jf-card-subtitle">Atualize as informações da oportunidade.</p>
                    </div>

                    <form className="jf-form" onSubmit={handleSubmit}>
                        <div className="jf-card-body">
                            {error && (
                                <p style={{ color: "#b91c1c", background: "#fee2e2", padding: "10px 14px", borderRadius: "8px", fontSize: "0.875rem" }}>
                                    {error}
                                </p>
                            )}

                            <div className="jf-field">
                                <label htmlFor="title">Título da vaga *</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Ex: Desenvolvedor Full Stack"
                                    minLength={3}
                                    maxLength={150}
                                    required
                                />
                            </div>

                            <div className="jf-field">
                                <label htmlFor="company">Empresa *</label>
                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Nome da empresa"
                                    required
                                />
                            </div>

                            <div className="jf-row">
                                <div className="jf-field">
                                    <label htmlFor="type">Tipo de contrato *</label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        <option value="CLT">CLT</option>
                                        <option value="PJ">PJ</option>
                                        <option value="Estágio">Estágio</option>
                                        <option value="Temporário">Temporário</option>
                                        <option value="Freelancer">Freelancer</option>
                                        <option value="Bolsa">Bolsa</option>
                                        <option value="Aprendiz">Aprendiz</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>

                                <div className="jf-field">
                                    <label htmlFor="modality">Modalidade *</label>
                                    <select
                                        id="modality"
                                        name="modality"
                                        value={formData.modality}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Presencial">Presencial</option>
                                        <option value="Remoto">Remoto</option>
                                        <option value="Híbrido">Híbrido</option>
                                    </select>
                                </div>
                            </div>

                            <div className="jf-row">
                                <div className="jf-field">
                                    <label htmlFor="location">Local *</label>
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Ex: Florianópolis, SC"
                                        required
                                    />
                                </div>

                                <div className="jf-field">
                                    <label htmlFor="salary">Salário *</label>
                                    <input
                                        id="salary"
                                        name="salary"
                                        type="text"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        onBlur={handleSalaryBlur}
                                        placeholder="Ex: 4000"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="jf-field">
                                <label htmlFor="description">Descrição da vaga *</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Descreva as responsabilidades, requisitos e benefícios..."
                                    minLength={10}
                                    maxLength={5000}
                                    required
                                />
                            </div>
                        </div>

                        <div className="jf-actions">
                            <Link to={`/jobs/${id}`} className="jf-btn-cancel">Cancelar</Link>
                            <button type="submit" className="jf-btn-submit" disabled={saving}>
                                {saving ? "Salvando..." : "Salvar alterações"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
