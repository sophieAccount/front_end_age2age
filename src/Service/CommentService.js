import http from "../http-common";

class CommentService {
    getAll() {
        return http.get("/comments");
    }

    get(id) {
        return http.get(`/comments/${id}`);
    }
    getCommentSend(id) {
        return http.get(`/comments/user/send/${id}`);
    }

    getCommentToValidate(){
        return http.get("/comments/comment/validate");
    }

    getCommentReceive(id) {
        return http.get(`/comments/user/receive/${id}`);
    }

    create(data) {
        return http.post("/comments", data);
    }

    update(id, data) {
        return http.put(`/comments/${id}`, data);
    }

    delete(id) {
        return http.delete(`/comments/${id}`);
    }
}

export default new CommentService();