/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Gym } from "$lib/types/gymmark-types";
import type { LeafletMapComponent } from "$lib/ui/LeafletMaps"; 
import { currentDataSets, loggedInUser } from "$lib/runes.svelte";
import { gymmarkService } from "./gymmark-service";


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

export async function refreshGymMap(map: LeafletMapComponent) {
    if (!loggedInUser.token) gymmarkService.restoreSession();
    const gyms = await gymmarkService.getGyms(loggedInUser.token);
    gyms.forEach((gym: Gym) => {
      if (typeof gym.category === "string") {  
        const popup = `<strong>${gym.title}</strong><br>${gym.category}`;       
        map.addMarker(gym.lat, gym.lng, popup);
      }
    });
    const lastGym = gyms[gyms.length - 1];
    if (lastGym) map.moveTo(lastGym.lat, lastGym.lng);
  }

  export async function refreshCategorizedGymMap(map: LeafletMapComponent) {
    if (!loggedInUser.token) gymmarkService.restoreSession();
    const gyms = await gymmarkService.getGyms(loggedInUser.token);

    const L = await import('leaflet');
    const categoryLayers: Record<string, any> = {};
  
    
    gyms.forEach((gym: Gym) => {
      if (typeof gym.category === "string") {
        const popup = `<strong>${gym.title}</strong><br>${gym.category}`;
  
        if (!categoryLayers[gym.category]) {
          categoryLayers[gym.category] = L.layerGroup(); 
        }
  
        const marker = L.marker([gym.lat, gym.lng]).bindPopup(popup);
        categoryLayers[gym.category].addLayer(marker);
      }
    });
  
    
    const overlayMaps: Record<string, any> = {};
    for (const category in categoryLayers) {
      categoryLayers[category].addTo(map.leafletInstance);
      overlayMaps[category] = categoryLayers[category];
    }
  
    L.control.layers(undefined, overlayMaps).addTo(map.leafletInstance);
  
    const lastGym = gyms[gyms.length - 1];
    if (lastGym) map.moveTo(lastGym.lat, lastGym.lng);
  }
  
