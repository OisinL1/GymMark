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

  async deleteGym(gymId: string, token: string): Promise<boolean> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.delete(`${this.baseUrl}/api/gyms/${gymId}`);
      await this.refreshGymInfo();
      return response.status === 200;
    } catch (error) {
      console.error("Error deleting gym:", error);
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

  async getGymById(id: string, token: string): Promise<Gym | null> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/gyms/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching gym by ID:", error);
      return null;
    }
  },
  
  async refreshGymInfo() {
    if (loggedInUser.token) {
    currentGyms.gyms = await this.getGyms(loggedInUser.token);
    computeCapacityByCategory(currentGyms.gyms);
    computeCountByCategory(currentGyms.gyms);
    }
  },

  async refreshCurrentGym(gymId: string, token: string): Promise<Gym | null> {
    try {
      const gym = await this.getGymById(gymId, token);
      return gym;
    } catch (error) {
      console.error("Failed to refresh current gym:", error);
      return null;
    }
  },

  

  async uploadGymImage(gymId: string, imageUrl: string): Promise<boolean> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + loggedInUser.token;
  
      const response = await axios.post(
        `${this.baseUrl}/api/gyms/${gymId}/uploadimage`,
        { url: imageUrl }
      );
  
      return response.status === 200;
    } catch (error) {
      console.error("Error uploading image:", error);
      return false;
    }
  },

  async deleteGymImage(gymId: string, imageUrl: string): Promise<boolean> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + loggedInUser.token;
  
      const response = await axios.delete(
        `${this.baseUrl}/api/gyms/${gymId}/deleteimage`,
        { data: { url: imageUrl } }
      );
  
      return response.status === 200;
    } catch (error) {
      console.error("Error deleting image:", error);
      return false;
    }
  }

  
  

 // async saveSession(session: Session, email: string) {
   // loggedInUser.email = email;
   // loggedInUser.name = session.name;
   // loggedInUser.token = session.token;
    //loggedInUser._id = session._id;
   // loggedInUser.isAdmin = session.isAdmin;
   // localStorage.gymmark = JSON.stringify(loggedInUser);
 // }

};