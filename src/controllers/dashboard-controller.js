/* eslint-disable func-names */
import { GymSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
export const dashboardController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const gyms = await db.gymStore.getUserGyms(loggedInUser._id);
            const viewData = {
                title: "Gym Dashboard",
                user: loggedInUser,
                gyms: gyms,
            };
            return h.view("dashboard-view", viewData);
        },
    },
    addGym: {
        validate: {
            payload: GymSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("dashboard-view", { title: "Add Gym error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            console.log("Received payload:", request.payload);
            const payload = request.payload;
            const newGym = {
                userid: loggedInUser._id,
                title: payload.title,
                lat: parseFloat(payload.lat),
                lng: parseFloat(payload.lng),
                description: payload.description,
                capacity: payload.capacity,
                category: payload.category,
            };
            await db.gymStore.addGym(newGym);
            return h.redirect("/dashboard");
        },
    },
    deleteGym: {
        handler: async function (request, h) {
            const gym = await db.gymStore.getGymById(request.params.id);
            await db.gymStore.deleteGymById(gym._id);
            return h.redirect("/dashboard");
        },
    },
};
