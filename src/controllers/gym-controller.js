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
        },
    },
    update: {
        handler: async function (request, h) {
            const gym = await db.gymStore.getGymById(request.params.id);
            if (!gym) {
                return h.response("Gym not found").code(404);
            }
            // Type assertion here
            const payload = request.payload;
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
};
