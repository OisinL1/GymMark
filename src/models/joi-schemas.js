import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");



export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  isAdmin: Joi.boolean().default(false),
};

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

