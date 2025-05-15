import type { Gym } from "./types/gymmark-types";

export const subTitle = $state({ text: "" });
export const loggedInUser = $state({ 
    email: "",
    name: "",
    token: "",
    _id: "",
    isAdmin: false
  });
  
  export const currentGyms = $state({ gyms: [] as Gym[] });