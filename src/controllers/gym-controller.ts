/* eslint-disable func-names */
import Joi from "joi";
import { db } from "../models/db.js";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { imageStore } from "../models/mongo/image-store.js";

// Define the expected shape of the payload
type GymPayload = {
  title: string;
  description: string;
  lat: string;
  lng: string;
  capacity: string;
  category: string;
};

export const gymController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const gym = await db.gymStore.getGymById(request.params.id);

      if (!gym) {
        return h.view("error", { title: "Gym Not Found" }).code(404);
      }

      const viewData = {
        title: `Gym - ${gym.title}`,
        gym: gym,
      };

      return h.view("gym-view", viewData);
    },
  },

  edit: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const gymId = request.params.id;

      const gym = await db.gymStore.getGymById(gymId);

      if (!gym) {
        return h.response("Gym not found").code(404);
      }

      return h.view("edit-gym-details", { gym });
    },
  },

  update: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const gym = await db.gymStore.getGymById(request.params.id);

      if (!gym) {
        return h.response("Gym not found").code(404);
      }

      const payload = request.payload as GymPayload;

      const updatedGym = {
        title: payload.title,
        description: payload.description,
        lat: parseFloat(payload.lat),
        lng: parseFloat(payload.lng),
        capacity: Number(payload.capacity),
        category: payload.category,
      };

      await db.gymStore.updateGym(gym._id, updatedGym);
      return h.redirect(`/gym/${gym._id}`);
    },
  },

  uploadImage: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const gym = await db.gymStore.getGymById(request.params.id);
        const payload = request.payload as { imagefile: any };
        const file = payload.imagefile;
  
        if (file && Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(file);
  
          if (!gym.images) {
            gym.images = [];
          }
          gym.images.push(url);
  
          await db.gymStore.updateGym(gym._id, gym); 
        }
  
        return h.redirect(`/add`);
      } catch (err) {
        console.error(err);
        return h.redirect(`/add`); 
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200, 
      parse: true,
    },
  },
};
