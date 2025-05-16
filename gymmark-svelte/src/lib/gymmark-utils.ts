import { currentDataSets } from "$lib/runes.svelte";
import type { Gym } from "$lib/types/gymmark-types";

export function computeCapacityByCategory(gymList: Gym[]) {
  currentDataSets.capacityByCategory.datasets[0].values = new Array(currentDataSets.capacityByCategory.labels.length).fill(0);

  gymList.forEach((gym) => {
    const index = currentDataSets.capacityByCategory.labels.indexOf(gym.category);
    if (index !== -1) {
      currentDataSets.capacityByCategory.datasets[0].values[index] += gym.capacity;
    }
  });
}

export function computeCountByCategory(gymList: Gym[]) {
  currentDataSets.countByCategory.datasets[0].values = new Array(currentDataSets.countByCategory.labels.length).fill(0);

  gymList.forEach((gym) => {
    const index = currentDataSets.countByCategory.labels.indexOf(gym.category);
    if (index !== -1) {
      currentDataSets.countByCategory.datasets[0].values[index] += 1;
    }
  });
}
