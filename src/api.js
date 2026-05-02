export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const getAuthToken = () => localStorage.getItem("token");
export const isAuthenticated = () => !!getAuthToken();

export const clearAuthState = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("studentProfile");
    localStorage.setItem("isLoggedIn", "false");
    window.dispatchEvent(new Event("authchange"));
};

export const apiFetch = async (endpoint, options = {}) => {
    const token = getAuthToken();

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401 || response.status === 403) {
        clearAuthState();
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "An error occurred during the request");
    }

    return response.json();
};
