import Mongoose from "mongoose";
import { User } from "./user.js";
import { userType } from "../../types/gymmark-types";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id: string) {
    if (Mongoose.isValidObjectId(id)) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user: userType) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email: string) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id: string) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },

  async promoteUserToAdmin(userId: string) {
    const user = await User.findById(userId);
    if (user) {
      user.isAdmin = true;
      await user.save();
      return user;
    }
    return null;
  }
  
};
