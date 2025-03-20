import Boom from "@hapi/boom";
import { GymSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const gymApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const gyms = await db.gymStore.getAllGyms();
        return gyms;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const gym = await db.gymStore.getGymById(request.params.id);
        if (!gym) {
          return Boom.notFound("No Gym with this id");
        }
        return gym;
      } catch (err) {
        return Boom.serverUnavailable("No Gym with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const gym = request.payload;
        const newGym = await db.gymStore.addGym(gym);
        if (newGym) {
          return h.response(newGym).code(201);
        }
        return Boom.badImplementation("error creating gym");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const gym = await db.gymStore.getGymById(request.params.id);
        if (!gym) {
          return Boom.notFound("No Gym with this id");
        }
        await db.gymStore.deleteGymById(gym._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Gym with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.gymStore.deleteAllGyms();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
