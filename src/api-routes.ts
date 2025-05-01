import { userApi } from "./api/user-api.js";
import { gymApi } from "./api/gym-api.js";

export const apiRoutes = [
  { method: "GET" as const, path: "/api/users", config: userApi.find },
  { method: "POST" as const, path: "/api/users", config: userApi.create },
  { method: "DELETE" as const, path: "/api/users", config: userApi.deleteAll },
  { method: "GET" as const, path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST" as const, path: "/api/gyms", config: gymApi.create },
  { method: "DELETE" as const, path: "/api/gyms", config: gymApi.deleteAll },
  { method: "GET" as const, path: "/api/gyms", config: gymApi.find },
  { method: "GET" as const, path: "/api/gyms/{id}", config: gymApi.findOne },
  { method: "DELETE" as const, path: "/api/gyms/{id}", config: gymApi.deleteOne },
  { method: "POST" as const, path: "/api/users/authenticate", config: userApi.authenticate },
];
