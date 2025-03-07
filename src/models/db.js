import { userMongoStore } from "./mongo/user-mongo-store.js";
import { gymMongoStore } from "./mongo/gym-mongo-store.js"; 
import { connectMongo } from "./mongo/connect.js"; 
import { userJsonStore } from "./json/user-json-store.js";
import { gymJsonStore } from "./json/gym-json-store.js";
import { gymMemStore } from "./mem/gym-mem-store.js";
import { userMemStore } from "./mem/user-mem-store.js";

export const db = {
  userStore: null,
  gymStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.gymStore = gymJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.gymStore = gymMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.gymStore = gymMemStore;
    }
  },

  updateGym(id, updatedGym) {
    return this.gymStore.updateGym(id, updatedGym);
  }
};
