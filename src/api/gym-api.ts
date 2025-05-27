import Boom from "@hapi/boom";
import mongoose from "mongoose";
import { Request, ResponseToolkit } from "@hapi/hapi"; 
import { IdSpec, GymArraySpec, GymSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/mongo/image-store.js";

export const gymApi = {
  find: {
    auth: {
      strategy: "jwt",
    },

    handler: async function (request: Request, h: ResponseToolkit) {
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
    auth: false,

    async handler(request: Request) {
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

  handler: async function (request: Request, h: ResponseToolkit) {
    try {
      console.log("Is the issue arising before payload is validated?");
      const gym = request.payload;
      console.log("Request Body", gym);
      const newGym = await db.gymStore.addGym(gym);
      if (newGym) {
        return h.response(newGym).code(201);
      }
      return Boom.badImplementation("error creating gym");
    } catch (err) {
      return Boom.badImplementation("error creating gym", err);      
    }
  },
  tags: ["api"],
  description: "Create a Gym",
  notes: "Returns the newly created gym",
  response: { schema: GymSpecPlus, failAction: validationError },
},

  deleteOne: {
    auth: {
      strategy: "jwt",
    },

    handler: async function (request: Request, h: ResponseToolkit) {
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

    handler: async function (request: Request, h: ResponseToolkit) {
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


  uploadImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const gym = await db.gymStore.getGymById(request.params.id);
        if (!gym) {
          return Boom.notFound("No gym with this ID");
        }
  
        const { url } = request.payload as { url?: string };
  
        if (!url || typeof url !== "string") {
          return Boom.badRequest("No image URL provided");
        }
  
        if (!gym.images) {
          gym.images = [];
        }
  
        gym.images.push(url);
        await db.gymStore.updateGym(gym._id, gym);
  
        return h.response({ success: true, images: gym.images }).code(200);
      } catch (err) {
        console.error(err);
        return Boom.badImplementation("Image upload failed");
      }
    },
  
    payload: {
      parse: true,
      output: "data",
      maxBytes: 209715200,
      multipart: false, 
    },
  
    tags: ["api"],
    description: "Add an image URL to a Gym's images array",
    notes: "Receives a Cloudinary URL and adds it to the Gym's Images array",
  },

  deleteImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const gym = await db.gymStore.getGymById(request.params.gymId);
        if (!gym) {
          return Boom.notFound("No gym with this ID");
        }
  
        const { url } = request.payload as { url?: string };
  
        if (!url || typeof url !== "string") {
          return Boom.badRequest("No image URL provided");
        }
  
        if (!gym.images || !gym.images.includes(url)) {
          return Boom.notFound("Image URL not found in gym images");
        }
  
        gym.images = gym.images.filter(imageUrl => imageUrl !== url);
  
        await db.gymStore.updateGym(gym._id, gym);
  
        return h.response({ success: true, images: gym.images }).code(200);
      } catch (err) {
        console.error(err);
        return Boom.badImplementation("Image deletion failed");
      }
    },
    payload: {
      parse: true,
      output: "data",
      maxBytes: 209715200,
      multipart: false,
    },
    tags: ["api"],
    description: "Delete an image URL from a Gym's images array",
    notes: "Removes image URL from the Gym's images array",
  }

};
