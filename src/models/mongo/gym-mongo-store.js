import Mongoose from "mongoose";
import { Gym } from "./gym.js";
export const gymStore = {
    async getAllGyms() {
        const gyms = await Gym.find().lean();
        return gyms;
    },
    async getGymById(id) {
        if (Mongoose.isValidObjectId(id)) {
            const gym = await Gym.findOne({ _id: id }).lean();
            return gym;
        }
        return null;
    },
    async addGym(gym) {
        const newGym = new Gym(gym);
        const gymObj = await newGym.save();
        return this.getGymById(gymObj._id);
    },
    async getUserGyms(userid) {
        const gyms = await Gym.find({ userid }).lean();
        return gyms;
    },
    async deleteGymById(id) {
        if (Mongoose.isValidObjectId(id)) {
            await Gym.deleteOne({ _id: id });
        }
    },
    async deleteAllGyms() {
        await Gym.deleteMany({});
    },
    async updateGym(id, gymData) {
        if (Mongoose.isValidObjectId(id)) {
            try {
                const updatedGym = await Gym.findByIdAndUpdate(id, gymData, { new: true });
                return updatedGym;
            }
            catch (error) {
                console.error(error);
                throw new Error("Failed to update gym");
            }
        }
        return null;
    },
};
