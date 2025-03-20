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
};
