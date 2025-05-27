import { userApi } from "./api/user-api.js";
import { gymApi } from "./api/gym-api.js";
export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "POST", path: "/api/gyms", config: gymApi.create },
    { method: "DELETE", path: "/api/gyms", config: gymApi.deleteAll },
    { method: "GET", path: "/api/gyms", config: gymApi.find },
    { method: "GET", path: "/api/gyms/{id}", config: gymApi.findOne },
    { method: "DELETE", path: "/api/gyms/{id}", config: gymApi.deleteOne },
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
    { method: "POST", path: "/api/gyms/{id}/uploadimage", config: gymApi.uploadImage, },
    { method: "DELETE", path: "/api/gyms/{gymId}/deleteimage", config: gymApi.deleteImage, },
];
