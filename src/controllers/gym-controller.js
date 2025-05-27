import { db } from "../models/db.js";
import { imageStore } from "../models/mongo/image-store.js";
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
    uploadImage: {
        handler: async function (request, h) {
            try {
                const gym = await db.gymStore.getGymById(request.params.id);
                const payload = request.payload;
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
            }
            catch (err) {
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
