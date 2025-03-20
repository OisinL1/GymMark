import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");



export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    isAdmin: Joi.boolean().example(false).required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const GymSpec = {
  title: Joi.string().required(),
  description: Joi.string().optional(), 
  lat: Joi.number().optional(),  
  lng: Joi.number().optional(), 
  capacity: Joi.number().min(1).optional(),
  category: Joi.string()
    .valid("CrossFit", "Bodybuilding", "Yoga", "Cardio", "Strongman", "Calisthenics")
    .required(),
};

