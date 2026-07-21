import api from "./axios";

const authApi = {
    login(credentials) {
        return api.post("/auth/login", credentials);
    },

    register(user) {
        return api.post("/auth/register", user);
    },

    refreshToken(refreshToken) {
        return api.post("/auth/refresh", {
            refreshToken,
        });
    },

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },
};

export default authApi;