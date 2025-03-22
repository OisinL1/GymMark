import Vision from "@hapi/vision";
import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import Inert from "@hapi/inert";
import path from "path";
import Joi from "joi";
import jwt from "hapi-auth-jwt2";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import HapiSwagger from "hapi-swagger";
import { validate } from "./api/jwt-utils.js";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { apiRoutes } from "./api-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const swaggerOptions = {
  info: {
    title: "Gymmark API",
    version: "0.1",
  },
};

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });

  await server.register(Vision);
  await server.register(Cookie);
  await server.register(Inert);
  await server.register(jwt);
  server.validator(Joi);

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  Handlebars.registerHelper("eq", (a, b) => a === b);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

async function addAdminUser() {
  const adminEmail = "admin@example.com";  
  const adminPassword = "admin123"; 
  const adminFirstName = "Admin";  
  const adminLastName = "User";  

  if (!db.userStore) {
    console.error("User store is not initialized.");
    return;
  }

//----------------------------------------------------------------------
 const existingAdmin = await db.userStore.getUserByEmail(adminEmail);
  if (!existingAdmin) {
    const adminUser = {
      firstName: adminFirstName,
      lastName: adminLastName,
      email: adminEmail,
      password: adminPassword,
      isAdmin: true,  
    };

    try {
      await db.userStore.addUser(adminUser);
      console.log("Admin user added successfully");
    } catch (error) {
      console.error("Error adding admin user:", error);
    }
  } else {
    console.log("Admin user already exists");
  }
}
//-------------------------------------------------------
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });

  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] }
  });
  server.auth.default("session");

  db.init("mongo");
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
  await addAdminUser();
}


process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
