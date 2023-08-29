import http from "../http-common";

class UserService {

    getAll() {
        return http.get("/users");
    }

    getAllRating() {
        return http.get(`/users/rate/getAllRating`);
    }
    getStats() {
        return http.get(`/users/stats/getStats`);
    }

    get(id) {
        return http.get(`/users/${id}`);
    }

    getUserFavourite(id) {
        return http.get(`/users/favourite/${id}`);
    }
    getUserFavouriteAdverts(id) {
        return http.get(`/users/userFavourite/${id}`);
    }

    getAverageRatingUser(id) {
        return http.get(`/users/rating/${id}`);
    }

    getAdvertsSelectedByUser(id) {
        return http.get(`/users/selected/${id}`);
    }

    getAdvertCreatedByUser(id) {
        return http.get(`/users/created/${id}`);
    }

    getCommentUserReceived(id) {
        return http.get(`/users/commentReceived/${id}`);
    }

    getCommentUserSend(id) {
        return http.get(`/users/commentSend/${id}`);
    }

    create(data) {
        return http.post("/users", data);
    }

    update(id, data) {
        return http.put(`/users/${id}`, data);
    }
    updateUserActive(id, active) {
        return http.put(`/users/status/${id}`, active);
    }
    updateUserRole(id, role) {
        return http.put(`/users/role/${id}`, role)
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }
}

export default new UserService();