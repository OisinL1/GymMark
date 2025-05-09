import * as dotenv from "dotenv";
import Mongoose from "mongoose";
import mongooseSeeder from "mais-mongoose-seeder"; 
import { seedData } from "./seed-data.js";

export function connectMongo() {
  dotenv.config();

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db);

  const db = Mongoose.connection;

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  async function seed() {
    const seedInstance = mongooseSeeder(Mongoose);
    const dbData = await seedInstance.seed(seedData, { dropDatabase: false, dropCollections: true });
    console.log(dbData);
  }

  // eslint-disable-next-line func-names
  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
    seed();
  });

}
