import axios from "axios";
import type { Session, User, Gym } from "$lib/types/gymmark-types";
import { loggedInUser, currentGyms } from "./runes.svelte";
import { computeCapacityByCategory, computeCountByCategory } from "$lib/gymmark-utils";


export const gymmarkService = {
  baseUrl: "http://localhost:3000",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  saveSession(session: Session, email: string) {
    loggedInUser.email = email;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;
    loggedInUser.isAdmin = session.isAdmin;
    localStorage.donation = JSON.stringify(loggedInUser);
  },

  async restoreSession() {
    const savedLoggedInUser = localStorage.donation;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
      loggedInUser.isAdmin = session.isAdmin;
    }
    await this.refreshGymInfo();
  },


  clearSession() {
    currentGyms.gyms = [];
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("donation");
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id,
          isAdmin: response.data.isAdmin
        };
        this.saveSession(session, email);
        await this.refreshGymInfo();
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async addGym(gym: Gym, token: string): Promise<boolean> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(
        `${this.baseUrl}/api/gyms`,
        gym
      );
      await this.refreshGymInfo();
      return response.status === 201;
    } catch (error) {
      console.error("Error adding gym:", error);
      return false;
    }
  },

  async getGyms(token: string): Promise<Gym[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/gyms`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async refreshGymInfo() {
    if (loggedInUser.token) {
    currentGyms.gyms = await this.getGyms(loggedInUser.token);
    computeCapacityByCategory(currentGyms.gyms);
    computeCountByCategory(currentGyms.gyms);
    }
  },

  

 // async saveSession(session: Session, email: string) {
   // loggedInUser.email = email;
   // loggedInUser.name = session.name;
   // loggedInUser.token = session.token;
    //loggedInUser._id = session._id;
   // loggedInUser.isAdmin = session.isAdmin;
   // localStorage.gymmark = JSON.stringify(loggedInUser);
 // }

};