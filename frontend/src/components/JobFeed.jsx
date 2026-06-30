import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { getJobs } from "../services/jobService";

function JobFeed({ search = "", reloadJobs }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadJobs() {
            try {
                setLoading(true);

                const data = await getJobs();

                setJobs(data);
            } catch (error) {
                console.error("Erro ao carregar vagas:", error);
                setJobs([]);
            } finally {
                setLoading(false);
            }
        }

        loadJobs();
    }, [reloadJobs]);

    const searchText = search.toLowerCase();

    const filteredJobs = jobs.filter((job) => {
        return (
            (job.title ?? "").toLowerCase().includes(searchText) ||
            (job.company ?? "").toLowerCase().includes(searchText)
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