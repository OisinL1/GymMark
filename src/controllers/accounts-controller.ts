/* eslint-disable func-names */
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { userType, UserCredentials } from "../types/gymmark-types"; 



export const accountsController = {
  index: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      return h.view("main", { title: "Welcome to GymMark" });
    },
  },
  showSignup: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      return h.view("signup-view", { title: "Sign up for GymMark" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const user: userType = request.payload as userType;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      return h.view("login-view", { title: "Login to GymMark" });
    },
  },

  
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },

    handler: async function (request: Request, h: ResponseToolkit) {
      const { email, password }: UserCredentials = request.payload as UserCredentials;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: async function (request: Request, h: ResponseToolkit) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request: Request, session: any) {
    const user: userType = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },

  adminDashboard: {
  handler: async function (request: Request, h: ResponseToolkit) {
    const loggedInUser: userType = request.auth.credentials as userType;

    if (!loggedInUser.isAdmin) {
      return h.response("Unauthorized").code(403);
    }

    const users = await db.userStore.getAllUsers();
    console.log("Admin Dashboard Users:", users);
    return h.view("admin-dashboard", { title: "Admin Dashboard", user: loggedInUser, users });
  },
},

 adminUsers: {
  handler: async function (request: Request, h: ResponseToolkit) {
    const loggedInUser: userType = request.auth.credentials as userType;

    if (!loggedInUser.isAdmin) {
      return h.response("Unauthorized").code(401);
    }

    const users = await db.userStore.getAllUsers();
    return h.view("admin-dashboard", { users });
  },
},

  promoteUserToAdmin: {
  handler: async function (request: Request, h: ResponseToolkit) {
    const loggedInUser: userType = request.auth.credentials as userType;
    if (!loggedInUser.isAdmin) {
      return h.response("Unauthorized").code(401);
    }

    const userId = request.params.id;
    await db.userStore.promoteUserToAdmin(userId);  

    return h.redirect("/admin/users");
  },
},
};
