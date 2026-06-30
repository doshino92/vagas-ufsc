const BASE_URL =
    import.meta.env.VITE_API_URL ||
    "https://vagas-ufsc-backend-962571578704.southamerica-east1.run.app/api";

const getHeaders = (token) => ({
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const parseResponse = async (res) => {
    const body = await res.json().catch(() => ({}));

    return {
        ok: res.ok,
        status: res.status,
        ...body,
    };
};

export const authService = {
    register: async (data) => {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        return parseResponse(res);
    },

    login: async (data) => {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        return parseResponse(res);
    },

    me: async (token) => {
        const res = await fetch(`${BASE_URL}/auth/me`, {
            headers: getHeaders(token),
        });

        return parseResponse(res);
    },
};

export const userService = {
    updateMe: async (token, data) => {
        const res = await fetch(`${BASE_URL}/users/me`, {
            method: "PUT",
            headers: getHeaders(token),
            body: JSON.stringify(data),
        });

        return parseResponse(res);
    },
};

export const applicationService = {
    apply: async (jobId, token) => {
        const res = await fetch(`${BASE_URL}/jobs/${jobId}/apply`, {
            method: "POST",
            headers: getHeaders(token),
        });

        return parseResponse(res);
    },

    getMyApplications: async (token) => {
        const res = await fetch(`${BASE_URL}/applications/my`, {
            headers: getHeaders(token),
        });

        return parseResponse(res);
    },

    getJobApplications: async (jobId, token) => {
        const res = await fetch(`${BASE_URL}/jobs/${jobId}/applications`, {
            headers: getHeaders(token),
        });

        return parseResponse(res);
    },

    updateStatus: async (applicationId, status, token) => {
        const res = await fetch(
            `${BASE_URL}/applications/${applicationId}/status`,
            {
                method: "PUT",
                headers: getHeaders(token),
                body: JSON.stringify({ status }),
            }
        );

        return parseResponse(res);
    },
};

export const notificationService = {
    getAll: async (token) => {
        const res = await fetch(`${BASE_URL}/notifications`, {
            headers: getHeaders(token),
        });

        return parseResponse(res);
    },

    markAsRead: async (notificationId, token) => {
        const res = await fetch(
            `${BASE_URL}/notifications/${notificationId}/read`,
            {
                method: "PATCH",
                headers: getHeaders(token),
            }
        );

        return parseResponse(res);
    },
};