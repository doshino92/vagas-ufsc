const BASE_URL =
    import.meta.env.VITE_API_URL ||
    "https://vagas-ufsc-backend-962571578704.southamerica-east1.run.app/api";

const API_URL = `${BASE_URL}/jobs`;

async function request(url, options = {}) {
    let response;

    try {
        response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            ...options,
        });
    } catch {
        throw new Error(
            "Não foi possível conectar ao servidor."
        );
    }

    let data;

    try {
        data = await response.json();
    } catch {
        data = undefined;
    }

    if (!response.ok) {
        throw new Error(
            data?.message ??
            "Erro na comunicação com o servidor."
        );
    }

    return data;
}

async function getJobs() {
    const jobs = await request(API_URL);

    return Array.isArray(jobs) ? jobs : [];
}

async function getJobById(id) {
    return await request(`${API_URL}/${id}`);
}

async function createJob(job) {
    return await request(API_URL, {
        method: "POST",
        body: JSON.stringify(job),
    });
}

async function updateJob(id, job) {
    return await request(`${API_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(job),
    });
}

async function deleteJob(id) {
    return await request(`${API_URL}/${id}`, {
        method: "DELETE",
    });
}

export {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
};