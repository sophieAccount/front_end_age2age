import http from "../http-common";

class MessageService {
    getAll() {
        return http.get("/messages");
    }

    get(id) {
        return http.get(`/messages/${id}`);
    }
    findMessageReveive(id) {
        return http.get(`/messages/user/send/${id}`);
    }
    findMessageSend(id) {
        return http.get(`/messages/user/receive/${id}`);
    }

    create(data) {
        return http.post("/messages", data);
    }

    update(id, data) {
        return http.put(`/messages/${id}`, data);
    }

    delete(id) {
        return http.delete(`/messages/${id}`);
    }
}

export default new MessageService();