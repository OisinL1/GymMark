/* eslint-disable func-names */
import Joi from "joi";
import { db } from "../models/db.js";

export const gymController = {
  index: {
    handler: async function (request, h) {
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
  handler: async function (request, h) {
    const gymId = request.params.id;

    const gym = await db.gymStore.getGymById(gymId);

    if (!gym) {
      return h.response("Gym not found").code(404);
    }

    return h.view("edit-gym-details", { gym });
  }
},

 update: {
  handler: async function (request, h) {
    const gym = await db.gymStore.getGymById(request.params.id);

    const updatedGym = {
      title: request.payload.title,
      description: request.payload.description,  
      location: {
        lat: parseFloat(request.payload.lat), 
        lng: parseFloat(request.payload.lng),  
      },
      capacity: Number(request.payload.capacity),
      category: request.payload.category,
    };

    await db.gymStore.updateGym(gym._id, updatedGym);
    return h.redirect(`/gym/${gym._id}`);
  },
},
};
