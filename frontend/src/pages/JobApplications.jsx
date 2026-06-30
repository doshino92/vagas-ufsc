import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { applicationService } from "../services/api";
import "./JobApplications.css";

const STATUSES = ["APPLIED", "IN_REVIEW", "INTERVIEW", "REJECTED", "APPROVED"];

const STATUS_LABELS = {
    APPLIED: "Candidatura enviada",
    IN_REVIEW: "Em análise",
    INTERVIEW: "Entrevista agendada",
    REJECTED: "Não aprovado",
    APPROVED: "Aprovado",
};

export default function JobApplications() {
    const { id: jobId } = useParams();
    const { token } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState(null);
    const [feedback, setFeedback] = useState({});

    useEffect(() => {
        applicationService.jobApplications(token, jobId).then((res) => {
            if (res.ok) setApplications(res.data);
            else setError("Erro ao carregar candidatos.");
            setLoading(false);
        });
    }, [token, jobId]);

    const handleStatusChange = async (applicationId, status) => {
        setUpdating(applicationId);
        const res = await applicationService.updateStatus(token, applicationId, status);
        setUpdating(null);
        if (res.ok) {
            setApplications((prev) =>
                prev.map((a) => (a._id === applicationId ? { ...a, status } : a))
            );
            setFeedback((prev) => ({ ...prev, [applicationId]: "✓ Atualizado" }));
            setTimeout(() => setFeedback((prev) => ({ ...prev, [applicationId]: "" })), 2000);
        } else {
            setFeedback((prev) => ({ ...prev, [applicationId]: "Erro ao atualizar." }));
        }
    };

    return (
        <div className="page">
            <Navbar />
            <main className="page-main">
                <Link to="/" className="back-link">← Voltar</Link>
                <h2 className="page-title">Candidatos desta vaga</h2>

                {loading && <p className="info-text">Carregando...</p>}
                {error && <p className="error-text">{error}</p>}
                {!loading && applications.length === 0 && (
                    <p className="info-text">Nenhum candidato ainda.</p>
                )}

                <div className="applications-list">
                    {applications.map((app) => (
                        <div key={app._id} className="application-card">
                            <div className="application-info">
                                <h3>{app.candidateId?.name}</h3>
                                <p className="application-email">{app.candidateId?.email}</p>
                                <p className="application-date">
                                    Candidatura em {new Date(app.createdAt).toLocaleDateString("pt-BR")}
                                </p>
                            </div>
                            <div className="application-status">
                                <select
                                    value={app.status}
                                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                    disabled={updating === app._id}
                                    className="status-select"
                                >
                                    {STATUSES.map((s) => (
                                        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                                    ))}
                                </select>
                                {feedback[app._id] && (
                                    <span className="feedback-msg">{feedback[app._id]}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
