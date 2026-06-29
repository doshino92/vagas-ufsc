const API_URL = "/api/jobs";

async function getJobs() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar vagas.");
    }

    return await response.json();
}

async function getJobById(id) {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Vaga não encontrada.");
    }

    return await response.json();
}

async function createJob(job) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
    });

    if (!response.ok) {
        throw new Error("Erro ao criar vaga.");
    }

    return await response.json();
}

async function updateJob(id, job) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar vaga.");
    }

    return await response.json();
}

async function deleteJob(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao remover vaga.");
    }

    return await response.json();
}

export {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
};