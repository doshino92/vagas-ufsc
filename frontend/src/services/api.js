const BASE_URL = "http://localhost:5000/api";

const getHeaders = (token) => ({
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const authService = {
    register: async (data) => {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json().then((body) => ({ ok: res.ok, ...body }));
    },

    login: async (data) => {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return res.json().then((body) => ({ ok: res.ok, ...body }));
    },

    me: async (token) => {
        const res = await fetch(`${BASE_URL}/auth/me`, {
            headers: getHeaders(token),
        });
        return res.json().then((body) => ({ ok: res.ok, ...body }));
    },
};

export const userService = {
    updateMe: async (token, data) => {
        const res = await fetch(`${BASE_URL}/users/me`, {
            method: "PUT",
            headers: getHeaders(token),
            body: JSON.stringify(data),
        });
        return res.json().then((body) => ({ ok: res.ok, ...body }));
    },
};
