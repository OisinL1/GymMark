import os from "os";
import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { gymController } from "./controllers/gym-controller.js";
import { userApi } from "./api/user-api.js";

export const webRoutes = [
  { method: "GET" as const, path: "/", config: accountsController.index },
  { method: "GET" as const, path: "/signup", config: accountsController.showSignup },
  { method: "GET" as const, path: "/login", config: accountsController.showLogin },
  { method: "GET" as const, path: "/logout", config: accountsController.logout },
  { method: "POST" as const, path: "/register", config: accountsController.signup },
  { method: "POST" as const, path: "/authenticate", config: accountsController.login },

  { method: "GET" as const, path: "/about", config: aboutController.index },

  { method: "GET" as const, path: "/dashboard", config: dashboardController.index },
  { method: "POST" as const, path: "/dashboard/addgym", config: dashboardController.addGym },
  { method: "GET" as const, path: "/dashboard/deletegym/{id}", config: dashboardController.deleteGym },

  { method: "GET" as const, path: "/gym/{id}", config: gymController.index },
  { method: "GET" as const, path: "/gym/{id}/edit", config: gymController.edit }, 
  { method: "POST" as const, path: "/gym/{id}/update", config: gymController.update },

  { method: "GET" as const, path: "/admin/dashboard", config: accountsController.adminDashboard }, 
  { method: "GET" as const, path: "/admin/users", config: accountsController.adminUsers },  
  { method: "GET" as const, path: "/admin/users/promote/{id}", config: accountsController.promoteUserToAdmin },  

  { method: "GET" as const, path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false as const } },


];
