import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/jobs";

function JobDetails() {
    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadJob() {
            try {
                const response = await fetch(`${API_URL}/${id}`);

                if (!response.ok) {
                    throw new Error("Vaga não encontrada.");
                }

                const data = await response.json();

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

            <button type="button">
                Candidatar-se
            </button>
        </main>
    );
}

export default JobDetails;