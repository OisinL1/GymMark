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

  export const currentDataSets = $state({
    capacityByCategory: {
      labels: ["CrossFit", "Bodybuilding", "Yoga", "Cardio", "Strongman", "Calisthenics"],
      datasets: [
        {
          values: [0, 0, 0, 0, 0, 0]
        }
      ]
    },
    countByCategory: {
      labels: ["CrossFit", "Bodybuilding", "Yoga", "Cardio", "Strongman", "Calisthenics"],
      datasets: [
        {
          values: [0, 0, 0, 0, 0, 0]
        }
      ]
    }
  })