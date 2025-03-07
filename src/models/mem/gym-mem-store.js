import { v4 } from "uuid";

let gyms = [];

export const gymMemStore = {
  async getAllGyms() {
    return gyms;
  },

  async addGym(gym) {
    gym._id = v4();
    gyms.push(gym);
    return gym;
  },

  async getGymById(id) {
    return gyms.find((gym) => gym._id === id) || null;
  },

  async getUserGyms(userid) {
    return gyms.filter((gym) => gym.userid === userid);
  },

  async deleteGymById(id) {
    const index = gyms.findIndex((gym) => gym._id === id);
    if (index !== -1) gyms.splice(index, 1);
  },

  async deleteAllGyms() {
    gyms = [];
  },
  async updateGym(id, updatedGym) {
    const gym = this.gyms.find((g) => g._id === id);
    if (gym) {
      Object.assign(gym, updatedGym);
      return gym;
    }
    return null;
  },
};
