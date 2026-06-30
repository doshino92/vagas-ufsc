import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJobById, deleteJob } from "../services/jobService";
import { applicationService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import "./JobDetails.css";

function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        async function loadJob() {
            try {
                setLoading(true);

                const data = await getJobById(id);

                setJob(data);
            } catch (error) {
                console.error("Erro ao carregar vaga:", error);
                setJob(null);
            } finally {
                setLoading(false);
            }
        }

        loadJob();
    }, [id]);

    async function handleDelete() {
        const confirmed = window.confirm(
            "Deseja realmente excluir esta vaga?"
        );

        if (!confirmed || deleting) {
            return;
        }

        try {
            setDeleting(true);

            await deleteJob(id);

            alert("Vaga removida com sucesso.");

            navigate("/", {
                replace: true,
            });
        } catch (error) {
            console.error("Erro ao remover vaga:", error);

            alert(
                error?.message ||
                "Não foi possível remover a vaga."
            );
        } finally {
            setDeleting(false);
        }
    }

    async function handleApply() {
        if (!token) {
            alert("Faça login para se candidatar.");
            navigate("/login");
            return;
        }

        if (user?.role !== "candidate") {
            alert("Apenas candidatos podem se candidatar.");
            return;
        }

        if (
            job?.recruiterId &&
            String(job.recruiterId) === String(user?._id)
        ) {
            alert("Você não pode se candidatar à sua própria vaga.");
            return;
        }

        try {
            setApplying(true);

            const response = await applicationService.apply(id, token);

            if (response.ok) {
                alert(response.message || "Candidatura realizada com sucesso!");
            } else {
                alert(response.message || "Não foi possível realizar a candidatura.");
            }
        } catch (error) {
            console.error(error);
            alert(error.message || "Erro ao realizar candidatura.");
        } finally {
            setApplying(false);
        }
    }

    if (loading) {
        return <h2>Carregando vaga...</h2>;
    }

    if (!job) {
        return (
            <main>
                <h2>Vaga não encontrada.</h2>

                <Link to="/">
                    <button type="button">
                        Voltar
                    </button>
                </Link>
            </main>
        );
    }

    return (
        <main>
            <section className="job-details">
                <h1>{job.title}</h1>

                <div className="job-details-info">
                    <p><strong>Empresa:</strong> {job.company}</p>
                    <p><strong>Tipo:</strong> {job.type}</p>
                    <p><strong>Modalidade:</strong> {job.modality}</p>
                    <p><strong>Local:</strong> {job.location}</p>
                    <p><strong>Salário:</strong> {job.salary}</p>
                </div>

                <h2>Descrição</h2>

                <p className="job-description">
                    {job.description}
                </p>

                <div className="job-details-actions">
                    <Link to={`/jobs/${id}/edit`}>
                        <button type="button">
                            Editar
                        </button>
                    </Link>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? "Excluindo..." : "Excluir"}
                    </button>

                    <button
                        type="button"
                        onClick={handleApply}
                        disabled={applying}
                    >
                        {applying ? "Candidatando..." : "Candidatar-se"}
                    </button>
                </div>
            </section>
        </main>
    );
}

export default JobDetails;