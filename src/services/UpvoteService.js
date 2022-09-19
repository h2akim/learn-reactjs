import axios from "axios";

export default {
  async toggle(data, userId) {
    const comment = await axios.post(
      "/api/upvotes",
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
