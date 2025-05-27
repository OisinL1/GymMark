import { connectMongo } from "./mongo/connect.js"; 
import { Db } from "../types/store-types.js";

export const db: Db = {
  userStore: null,
  gymStore: null,
};

export function connectDb(dbType: string) {
  switch (dbType) {
    case "mongo":
      connectMongo(db);
      break;
    default:
  }
}


  


