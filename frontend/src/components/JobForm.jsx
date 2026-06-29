import { useState } from "react";
import { createJob } from "../services/jobService";
import "./JobForm.css";

const initialState = {
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    modality: "",
    description: "",
};

function JobForm({ onJobCreated }) {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousState) => ({
            ...previousState,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (loading) {
            return;
        }

        setLoading(true);

        try {
            await createJob(formData);

            setFormData(initialState);

            if (onJobCreated) {
                onJobCreated();
            }

            alert("Vaga publicada com sucesso!");
        } catch (error) {
            console.error(error);

            alert(
                error?.message ||
                "Não foi possível publicar a vaga."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="job-form">
            <h2>Cadastrar vaga</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Título da vaga"
                    value={formData.title}
                    onChange={handleChange}
                    minLength={3}
                    maxLength={150}
                    required
                />

                <input
                    type="text"
                    name="company"
                    placeholder="Empresa"
                    value={formData.company}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Local"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="salary"
                    placeholder="Salário"
                    value={formData.salary}
                    onChange={handleChange}
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
                    placeholder="Descrição da vaga"
                    value={formData.description}
                    onChange={handleChange}
                    minLength={10}
                    maxLength={5000}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Publicando..."
                        : "Publicar vaga"}
                </button>
            </form>
        </section>
    );
}

export default JobForm;