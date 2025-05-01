import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");


export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

  export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    isAdmin: Joi.boolean().example(false).default(false), 
  }).label("UserDetails");

  export const UserSpecPlus = UserSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  }).label("UserDetailsPlus");

  export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");


export const GymSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Gold's Gym"),
    description: Joi.string().optional().example("The Mecca of Bodybuilding in Venice Beach."),
    lat: Joi.number().optional().example(33.985),
    lng: Joi.number().optional().example(-118.4695),
    capacity: Joi.number().min(1).optional().example(300),
    category: Joi.string()
      .valid("CrossFit","Bodybuilding","Yoga","Cardio","Strongman","Calisthenics", "General Fitness")
      .required()
      .example("Bodybuilding"),
    userid: IdSpec, 
  })
  .label("Gym");

export const GymSpecPlus = GymSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("GymPlus");

export const GymArraySpec = Joi.array().items(GymSpecPlus).label("GymArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
