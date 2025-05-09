import os from "os";
import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { gymController } from "./controllers/gym-controller.js";
import { userApi } from "./api/user-api.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addgym", config: dashboardController.addGym },
  { method: "GET", path: "/dashboard/deletegym/{id}", config: dashboardController.deleteGym },

  { method: "GET", path: "/gym/{id}", config: gymController.index },
  { method: "GET", path: "/gym/{id}/edit", config: gymController.edit }, 
  { method: "POST", path: "/gym/{id}/update", config: gymController.update },

  { method: "GET", path: "/admin/dashboard", config: accountsController.adminDashboard }, 
  { method: "GET", path: "/admin/users", config: accountsController.adminUsers },  
  { method: "GET", path: "/admin/users/promote/{id}", config: accountsController.promoteUserToAdmin },  

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

  {
    method: "GET",
    path: "/testlb",
    handler: function (request, h) {
       return(`Server: ${  os.hostname()}`);
    },
    config: {auth: false}
  },
  


];
