import api from "../api/axiosConfig";

const USER_API = "/users";

const userService = {

    getAllUsers: () => api.get(USER_API),

    getUserById: (id) => api.get(`${USER_API}/${id}`),

    createUser: (user) => api.post(USER_API, user),

    updateUser: (id, user) =>
        api.put(`${USER_API}/${id}`, user),

    updateStatus: (id, active) =>
        api.patch(`${USER_API}/${id}/status?active=${active}`),

    updatePassword: (id, password) =>
        api.put(`${USER_API}/${id}/password`, {
            newPassword: password
        })
};

export default userService;