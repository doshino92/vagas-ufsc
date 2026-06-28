import { useParams } from "react-router-dom";
import { getJobs } from "../services/jobService";

function JobDetails() {

    const { id } = useParams();

    const job = getJobs().find(
        (job) => job.id === Number(id)
    );

    if (!job) {
        return <h2>Vaga não encontrada.</h2>;
    }

    return (
        <main>

            <h1>{job.titulo}</h1>

            <p>
                <strong>Empresa:</strong> {job.empresa}
            </p>

            <p>
                <strong>Tipo:</strong> {job.tipo}
            </p>

            <p>
                <strong>Modalidade:</strong> {job.modalidade}
            </p>

            <p>
                <strong>Cidade:</strong> {job.cidade}
            </p>

            <p>
                <strong>Salário:</strong> {job.salario}
            </p>

            <h2>Descrição</h2>

            <p>{job.descricao}</p>

            <button>
                Candidatar-se
            </button>

        </main>
    );
}

export default JobDetails;