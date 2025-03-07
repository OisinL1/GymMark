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
    // Get the gym ID from the route params
    const gymId = request.params.id;

    // Retrieve the gym by its ID from the database
    const gym = await db.gymStore.getGymById(gymId);

    // If no gym is found, return a 404 error response
    if (!gym) {
      return h.response("Gym not found").code(404);
    }

    // Pass the gym data to the edit-gym-details view for rendering
    return h.view("edit-gym-details", { gym });
  }
},

  // Update gym details
  update: {
    handler: async function (request, h) {
      const gym = await db.gymStore.getGymById(request.params.id);

      const updatedGym = {
        title: request.payload.title,
        location: request.payload.location,
        capacity: Number(request.payload.capacity),
        category: request.payload.category,
      };

      await db.gymStore.updateGym(gym._id, updatedGym);
      return h.redirect(`/gym/${gym._id}`);
    },
  },
};
