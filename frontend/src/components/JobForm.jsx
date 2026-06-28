import { useState } from "react";
import { createJob } from "../services/jobService";
import "./JobForm.css";

function JobForm({ onJobCreated }) {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "",
        modality: "",
        description: "",
    });

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
            await createJob(formData);

            alert("Vaga cadastrada com sucesso!");

            setFormData({
                title: "",
                company: "",
                location: "",
                salary: "",
                type: "",
                modality: "",
                description: "",
            });

            if (onJobCreated) {
                onJobCreated();
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar vaga.");
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

                <input
                    type="text"
                    name="type"
                    placeholder="Tipo da vaga"
                    value={formData.type}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="modality"
                    placeholder="Modalidade"
                    value={formData.modality}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Descrição da vaga"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Publicar vaga
                </button>
            </form>
        </section>
    );
}

export default JobForm;