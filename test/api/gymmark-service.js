import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const gymmarkService = {
  gymmarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.gymmarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.gymmarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.gymmarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.gymmarkUrl}/api/users`);
    return res.data;
  },
};
