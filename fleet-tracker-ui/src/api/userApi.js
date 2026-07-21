import api from "./axios";

const BASE_URL = "/users";

const userApi = {

    // Get all users
    getAll() {
        return api.get(BASE_URL);
    },

    // Get user by ID
    getById(id) {
        return api.get(`${BASE_URL}/${id}`);
    },

    // Create user
    create(user) {
        return api.post(BASE_URL, user);
    },

    // Update user
    update(id, user) {
        return api.put(`${BASE_URL}/${id}`, user);
    },

    // Activate / Deactivate user
    updateStatus(id, active) {
        return api.patch(
            `${BASE_URL}/${id}/status`,
            null,
            {
                params: {
                    active
                }
            }
        );
    },

    // Change password
    updatePassword(id, passwordData) {
        return api.put(
            `${BASE_URL}/${id}/password`,
            passwordData
        );
    }

};

export default userApi;