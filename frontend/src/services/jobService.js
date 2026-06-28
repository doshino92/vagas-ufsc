const API_URL = "http://localhost:5000/api/jobs";

async function getJobs() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar vagas.");
    }

    return await response.json();
}

export { getJobs };