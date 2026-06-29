import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJobById, deleteJob } from "../services/jobService";
import "./JobDetails.css";

function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

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
                        {deleting
                            ? "Excluindo..."
                            : "Excluir"}
                    </button>

                    <button type="button">
                        Candidatar-se
                    </button>
                </div>
            </section>
        </main>
    );
}

export default JobDetails;