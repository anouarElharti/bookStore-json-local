import { apiCallBooks } from "../features/api";

class BookDataService {
  getAll() {
    return apiCallBooks.get("/books");
  }
  get(id) {
    return apiCallBooks.get(`/books/${id}`);
  }
  create(data) {
    return apiCallBooks.post("/books", data);
  }
  update(id, data) {
    return apiCallBooks.put(`/books/${id}`, data);
  }
  delete(id) {
    return apiCallBooks.delete(`/books/${id}`);
  }
}
export default new BookDataService();
