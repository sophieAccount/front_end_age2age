import http from "../http-common";

class AdvertService {

    getAll() {
        return http.get("/adverts");
    }

    get(id) {
        return http.get(`/adverts/${id}`);
    }

    findAdvertCreated(id) {
        return http.get(`/adverts/created/${id}`);
    }

    findAdvertSelected(id) {
        return http.get(`/adverts/selected/${id}`);
    }

    create(data) {
        return http.post("/adverts", data);
    }

    update(id, data) {
        return http.put(`/adverts/${id}`, data);
    }

    delete(id) {
        return http.delete(`/adverts/${id}`);
    }

    findByTitle(title) {
        return http.get(`/adverts/title/${title}`);
    }

    findAdvertByCategory(id) {
        return http.get(`/adverts/category/${id}`);
    }
}

export default new AdvertService();