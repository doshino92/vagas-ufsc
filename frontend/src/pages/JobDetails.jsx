import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJobById, deleteJob } from "../services/jobService";

function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadJob() {
            try {
                const data = await getJobById(id);
                setJob(data);
            } catch (error) {
                console.error(error);
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

        if (!confirmed) {
            return;
        }

        try {
            await deleteJob(id);

            alert("Vaga removida com sucesso!");

            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Erro ao remover vaga.");
        }
    }

    if (loading) {
        return <h2>Carregando vaga...</h2>;
    }

    if (!job) {
        return <h2>Vaga não encontrada.</h2>;
    }

    return (
        <main>
            <h1>{job.title}</h1>

            <p>
                <strong>Empresa:</strong> {job.company}
            </p>

            <p>
                <strong>Tipo:</strong> {job.type}
            </p>

            <p>
                <strong>Modalidade:</strong> {job.modality}
            </p>

            <p>
                <strong>Local:</strong> {job.location}
            </p>

            <p>
                <strong>Salário:</strong> {job.salary}
            </p>

            <h2>Descrição</h2>

            <p>{job.description}</p>

            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "20px",
                }}
            >
                <Link to={`/jobs/${id}/edit`}>
                    <button type="button">
                        Editar
                    </button>
                </Link>

                <button
                    type="button"
                    onClick={handleDelete}
                >
                    Excluir
                </button>

                <button type="button">
                    Candidatar-se
                </button>
            </div>
        </main>
    );
}

export default JobDetails;