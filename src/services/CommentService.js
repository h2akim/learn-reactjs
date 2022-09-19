import axios from "axios";

export default {
  async list() {
    const comments = await axios.get("/api/comments");
    return comments;
  },
	async get(commentId) {
    const comment = await axios.get(`/api/comments/${commentId}`);
    return comment;
  },
  async post(data, userId) {
    const comment = await axios.post(
      "/api/comments",
      data,
      {
        headers: {
          "User-Id": userId,
        },
      }
    );
    return comment;
  },
};
