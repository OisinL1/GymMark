import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const gymJsonStore = {
  async getAllGyms() {
    await db.read();
    return db.data.gyms;
  },

  async addGym(gym) {
    await db.read();
    gym._id = v4();
    db.data.gyms.push(gym);
    await db.write();
    return gym;
  },

  async getGymById(id) {
    await db.read();
    return db.data.gyms.find((gym) => gym._id === id) || null;
  },

  async getUserGyms(userid) {
    await db.read();
    return db.data.gyms.filter((gym) => gym.userid === userid);
  },

  async deleteGymById(id) {
    await db.read();
    const index = db.data.gyms.findIndex((gym) => gym._id === id);
    if (index !== -1) db.data.gyms.splice(index, 1);
    await db.write();
  },

  async deleteAllGyms() {
    db.data.gyms = [];
    await db.write();
  },

  async updateGym(id, updatedGym) {
    const gym = this.gyms.find((g) => g._id === id);
    if (gym) {
      Object.assign(gym, updatedGym);
      await this.save();
      return gym;
    }
    return null;
  },
};
