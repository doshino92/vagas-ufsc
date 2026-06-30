import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { applicationService } from "../services/api";
import "./Home.css";

const BASE_URL = "http://localhost:5000/api";

export default function Home() {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applyFeedback, setApplyFeedback] = useState({});

    useEffect(() => {
        fetch(`${BASE_URL}/jobs`, { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => r.json())
            .then((data) => {
                setJobs(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [token]);

    const handleApply = async (jobId) => {
        setApplyFeedback((prev) => ({ ...prev, [jobId]: "loading" }));
        const res = await applicationService.apply(token, jobId);
        if (res.ok) {
            setApplyFeedback((prev) => ({ ...prev, [jobId]: "success" }));
        } else {
            setApplyFeedback((prev) => ({ ...prev, [jobId]: res.message || "Erro" }));
        }
    };

    return (
        <div className="home-page">
            <Navbar />
            <main className="home-main">
                <h2 className="home-section-title">
                    {user.role === "recruiter" ? "Vagas cadastradas" : "Vagas disponíveis"}
                </h2>

                {loading && <p className="home-info">Carregando vagas...</p>}
                {!loading && jobs.length === 0 && (
                    <p className="home-info">Nenhuma vaga disponível no momento.</p>
                )}

                <div className="jobs-list">
                    {jobs.map((job) => (
                        <div key={job._id} className="job-card">
                            <div className="job-info">
                                <h3>{job.title}</h3>
                                <p className="job-location">📍 {job.location}</p>
                                <p className="job-description">{job.description}</p>
                            </div>
                            <div className="job-actions">
                                {user.role === "candidate" && (
                                    <>
                                        {applyFeedback[job._id] === "success" ? (
                                            <span className="apply-success">✓ Candidatura enviada!</span>
                                        ) : applyFeedback[job._id] === "loading" ? (
                                            <span className="apply-loading">Enviando...</span>
                                        ) : applyFeedback[job._id] ? (
                                            <span className="apply-error">{applyFeedback[job._id]}</span>
                                        ) : (
                                            <button
                                                className="apply-btn"
                                                onClick={() => handleApply(job._id)}
                                            >
                                                Candidatar-se
                                            </button>
                                        )}
                                    </>
                                )}
                                {user.role === "recruiter" && (
                                    <button
                                        className="candidates-btn"
                                        onClick={() => navigate(`/jobs/${job._id}/applications`)}
                                    >
                                        Ver candidatos
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
