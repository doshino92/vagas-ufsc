import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { getJobs } from "../services/jobService";

function JobFeed({ search }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadJobs() {
            try {
                const data = await getJobs();

                console.table(data);

                setJobs(data);
            } catch (error) {
                console.error("Erro ao carregar vagas:", error);
            } finally {
                setLoading(false);
            }
        }

        loadJobs();
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const text = search.toLowerCase();

        return (
            (job.title ?? "").toLowerCase().includes(text) ||
            (job.company ?? "").toLowerCase().includes(text)
        );
    });

    if (loading) {
        return <p>Carregando vagas...</p>;
    }

    return (
        <section>
            <h2>Vagas Disponíveis</h2>

            {filteredJobs.length === 0 ? (
                <p>Nenhuma vaga encontrada.</p>
            ) : (
                filteredJobs.map((job) => (
                    <JobCard
                        key={job._id}
                        job={job}
                    />
                ))
            )}
        </section>
    );
}

export default JobFeed;