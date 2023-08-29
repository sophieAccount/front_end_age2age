import http from "../http-common";

class UserHasFavouriteService {
    create(data) {
        return http.post("/userFavourite", data);
    }


    delete(id) {
        return http.delete(`/userFavourite/${id}`);
    }
}

export default new UserHasFavouriteService();