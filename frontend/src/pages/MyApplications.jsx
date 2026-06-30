import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { applicationService } from "../services/api";
import "./MyApplications.css";

const STATUS_LABELS = {
    APPLIED: "Candidatura enviada",
    IN_REVIEW: "Em análise",
    INTERVIEW: "Entrevista agendada",
    REJECTED: "Não aprovado",
    APPROVED: "Aprovado",
};

const STATUS_CLASS = {
    APPLIED: "status-applied",
    IN_REVIEW: "status-review",
    INTERVIEW: "status-interview",
    REJECTED: "status-rejected",
    APPROVED: "status-approved",
};

export default function MyApplications() {
    const { token } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        applicationService.myApplications(token).then((res) => {
            if (res.ok) setApplications(res.data);
            else setError("Erro ao carregar candidaturas.");
            setLoading(false);
        });
    }, [token]);

    return (
        <div className="page">
            <Navbar />
            <main className="page-main">
                <h2 className="page-title">Minhas Candidaturas</h2>

                {loading && <p className="info-text">Carregando...</p>}
                {error && <p className="error-text">{error}</p>}
                {!loading && applications.length === 0 && (
                    <p className="info-text">Você ainda não se candidatou a nenhuma vaga.</p>
                )}

                <div className="applications-list">
                    {applications.map((app) => (
                        <div key={app._id} className="application-card">
                            <div className="application-info">
                                <h3>{app.jobId?.title}</h3>
                                <p className="application-location">{app.jobId?.location}</p>
                                <p className="application-date">
                                    Candidatura em {new Date(app.createdAt).toLocaleDateString("pt-BR")}
                                </p>
                            </div>
                            <span className={`status-badge ${STATUS_CLASS[app.status]}`}>
                                {STATUS_LABELS[app.status]}
                            </span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
