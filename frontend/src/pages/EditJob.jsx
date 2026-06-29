import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";
import "../components/JobForm.css";

function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "",
        modality: "",
        description: "",
    });

    useEffect(() => {
        async function loadJob() {
            try {
                const job = await getJobById(id);

                setFormData({
                    title: job.title,
                    company: job.company,
                    location: job.location,
                    salary: job.salary,
                    type: job.type,
                    modality: job.modality,
                    description: job.description,
                });
            } catch (error) {
                console.error(error);
            }
        }

        loadJob();
    }, [id]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousState) => ({
            ...previousState,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await updateJob(id, formData);

            alert("Vaga atualizada com sucesso!");

            navigate(`/jobs/${id}`);
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar vaga.");
        }
    }

    return (
        <main>
            <section className="job-form">
                <h2>Editar vaga</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Título da vaga"
                        required
                    />

                    <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Empresa"
                        required
                    />

                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Local"
                        required
                    />

                    <input
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="Salário"
                        required
                    />

                    <input
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        placeholder="Tipo da vaga"
                        required
                    />

                    <input
                        name="modality"
                        value={formData.modality}
                        onChange={handleChange}
                        placeholder="Modalidade"
                        required
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descrição da vaga"
                        required
                    />

                    <button type="submit">
                        Salvar alterações
                    </button>
                </form>
            </section>
        </main>
    );
}

export default EditJob;