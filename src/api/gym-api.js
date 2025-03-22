import Boom from "@hapi/boom";
import { IdSpec, GymArraySpec, GymSpec, GymSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const gymApi = {
  find: {
    auth: {
      strategy: "jwt",
    },

    handler: async function (request, h) {
      try {
        const gyms = await db.gymStore.getAllGyms();
        return gyms;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: GymArraySpec, failAction: validationError },
    description: "Get all gyms",
    notes: "Returns all gyms",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },

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
    tags: ["api"],
    description: "Find a Gym",
    notes: "Returns a gym",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: GymSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },

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
    tags: ["api"],
    description: "Create a Gym",
    notes: "Returns the newly created gym",
    validate: { payload: GymSpec, failAction: validationError },
    response: { schema: GymSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },

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
    tags: ["api"],
    description: "Delete a gym",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },

    handler: async function (request, h) {
      try {
        await db.gymStore.deleteAllGyms();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all GymApi",
  },
};
