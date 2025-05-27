import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { UserCredentialsSpec, UserSpec, UserSpecPlus, IdSpec, UserArray, JwtAuth } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";
import { userType } from "../types/gymmark-types.js";

export const userApi = {
  authenticate: {
  auth: false,
  handler: async function (request: Request, h: ResponseToolkit) {
    const payload = request.payload as userType;
    console.log("→ [AUTH] payload:", payload);

    try {
      const user = (await db.userStore.getUserByEmail(payload.email)) as userType;
      console.log("→ [AUTH] user from DB:", user);

      if (user === null) {
        console.warn("← [AUTH] No such user");
        return Boom.unauthorized("User not found");
      }

      const passwordsMatch: boolean = payload.password === user.password;
      console.log(`→ [AUTH] passwords match? ${passwordsMatch}`);

      if (!passwordsMatch) {
        console.warn("← [AUTH] Password mismatch");
        return Boom.unauthorized("Invalid password");
      }

      const token = createToken(user);
      console.log("→ [AUTH] issuing token");

      return h.response({
        success: true,
        name: `${user.firstName} ${user.lastName}`,
        token,
        _id: user._id,
        isAdmin: user.isAdmin
      }).code(201);
    } catch (err) {
      console.error("✖ [AUTH] ERROR:", err);
      return Boom.serverUnavailable("Database Error");
    }
  },
  tags: ["api"],
  description: "Authenticate a User",
  notes: "If user has valid email/password, create and return a JWT token",
  validate: { payload: UserCredentialsSpec, failAction: validationError },
  response: { schema: JwtAuth, failAction: validationError }
},
  
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all userApi",
    notes: "Returns details of all userApi",
    response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const userPayload = request.payload as userType;
        const user = await db.userStore.addUser(userPayload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a User",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all userApi",
    notes: "All userApi removed from Gymmark",
  },
};
