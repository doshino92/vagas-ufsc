import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { getJobs } from "../services/jobService";
import "./Home.css";

export default function Home() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getJobs()
            .then((data) => setJobs(data))
            .catch(() => setError("Não foi possível carregar as vagas."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="home-page">
            <Navbar />

            <main className="home-main">
                {user?.role === "recruiter" && (
                    <div className="home-cta">
                        <div className="home-cta-text">
                            <strong>Você é recrutador</strong>
                            <span>Publique uma nova vaga e encontre os melhores candidatos.</span>
                        </div>
                        <Link to="/jobs/new" className="home-cta-btn">+ Nova vaga</Link>
                    </div>
                )}

                <h2 className="home-section-title">Vagas disponíveis</h2>

                {loading && <p className="home-info">Carregando vagas...</p>}
                {error && <p className="home-error">{error}</p>}
                {!loading && !error && jobs.length === 0 && (
                    <p className="home-info">Nenhuma vaga disponível no momento.</p>
                )}

                <div className="jobs-list">
                    {jobs.map((job) => (
                        <Link key={job._id} to={`/jobs/${job._id}`} className="job-card">
                            <div className="job-card-header">
                                <h3 className="job-title">{job.title}</h3>
                                <span className="job-type">{job.type}</span>
                            </div>
                            <p className="job-company">{job.company}</p>
                            <div className="job-meta">
                                <span>{job.location}</span>
                                <span className="job-meta-dot">·</span>
                                <span>{job.modality}</span>
                                {job.salary && (
                                    <>
                                        <span className="job-meta-dot">·</span>
                                        <span>{job.salary}</span>
                                    </>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
