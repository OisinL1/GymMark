/* eslint-disable prefer-template */
/* eslint-disable dot-notation */
import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

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
    try {
      const res = await axios.get(`${this.gymmarkUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.gymmarkUrl}/api/users`);
    return res.data;
  },

  async createGym(gym) {
    const res = await axios.post(`${this.gymmarkUrl}/api/gyms`, gym);
    return res.data;
  },

  async deleteAllGyms() {
    const response = await axios.delete(`${this.gymmarkUrl}/api/gyms`);
    return response.data;
  },

  async deleteGym(id) {
    const response = await axios.delete(`${this.gymmarkUrl}/api/gyms/${id}`);
    return response;
  },

  async getAllGyms() {
    const res = await axios.get(`${this.gymmarkUrl}/api/gyms`);
    return res.data;
  },

  async getGym(id) {
    const res = await axios.get(`${this.gymmarkUrl}/api/gyms/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.gymmarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
