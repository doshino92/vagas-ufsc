import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";
import "../components/JobForm.css";

const initialState = {
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    modality: "",
    description: "",
};

function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadJob() {
            try {
                setLoading(true);

                const job = await getJobById(id);

                if (!job) {
                    navigate("/", { replace: true });
                    return;
                }

                setFormData({
                    title: job.title ?? "",
                    company: job.company ?? "",
                    location: job.location ?? "",
                    salary: job.salary ?? "",
                    type: job.type ?? "",
                    modality: job.modality ?? "",
                    description: job.description ?? "",
                });
            } catch (error) {
                console.error("Erro ao carregar vaga:", error);
                navigate("/", { replace: true });
            } finally {
                setLoading(false);
            }
        }

        loadJob();
    }, [id, navigate]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousState) => ({
            ...previousState,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (saving) {
            return;
        }

        try {
            setSaving(true);

            await updateJob(id, formData);

            alert("Vaga atualizada com sucesso.");

            navigate(`/jobs/${id}`, {
                replace: true,
            });
        } catch (error) {
            console.error("Erro ao atualizar vaga:", error);

            alert(
                error?.message ||
                "Não foi possível atualizar a vaga."
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <h2>Carregando vaga...</h2>;
    }

    return (
        <main>
            <section className="job-form">
                <h2>Editar vaga</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Título da vaga"
                        minLength={3}
                        maxLength={150}
                        required
                    />

                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Empresa"
                        required
                    />

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Local"
                        required
                    />

                    <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="Salário"
                        required
                    />

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Tipo da vaga</option>
                        <option value="CLT">CLT</option>
                        <option value="PJ">PJ</option>
                        <option value="Estágio">Estágio</option>
                        <option value="Temporário">Temporário</option>
                        <option value="Freelancer">Freelancer</option>
                        <option value="Bolsa">Bolsa</option>
                        <option value="Aprendiz">Aprendiz</option>
                        <option value="Outro">Outro</option>
                    </select>

                    <select
                        name="modality"
                        value={formData.modality}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Modalidade</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Remoto">Remoto</option>
                        <option value="Híbrido">Híbrido</option>
                    </select>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descrição da vaga"
                        minLength={10}
                        maxLength={5000}
                        required
                    />

                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving
                            ? "Salvando..."
                            : "Salvar alterações"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default EditJob;