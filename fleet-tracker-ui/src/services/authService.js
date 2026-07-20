import api from "../api/axiosConfig";

const TOKEN_KEY = "token";
const USER_KEY = "user";

const authService = {

    async login(loginData) {

        const response = await api.post("/auth/login", loginData);

        const data = response.data;

        localStorage.setItem(TOKEN_KEY, data.token);

        localStorage.setItem(USER_KEY, JSON.stringify({
            fullName: data.fullName,
            email: data.email,
            role: data.role
        }));

        return data;
    },

    async register(registerData) {

        const response = await api.post("/auth/register", registerData);

        return response.data;
    },

    logout() {

        localStorage.removeItem(TOKEN_KEY);

        localStorage.removeItem(USER_KEY);
    },

    getToken() {

        return localStorage.getItem(TOKEN_KEY);
    },

    getCurrentUser() {

        const user = localStorage.getItem(USER_KEY);

        return user ? JSON.parse(user) : null;
    },

    isAuthenticated() {

        return !!localStorage.getItem(TOKEN_KEY);
    }

};

export default authService;