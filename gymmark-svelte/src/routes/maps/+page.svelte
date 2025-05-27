<script lang="ts">
    import { subTitle } from "$lib/runes.svelte";
    import { refreshGymMap, refreshCategorizedGymMap } from "$lib/gymmark-utils";
    import Card from "$lib/ui/Card.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import type { LeafletMapComponent } from "$lib/ui/LeafletMaps.ts";
    import { onMount } from "svelte";
  
    subTitle.text = "GymMark Geo Data";
    let map: LeafletMap;
    let categorizedMap: LeafletMapComponent;
  
    onMount(async () => {
      await refreshGymMap(map);
      await refreshCategorizedGymMap(categorizedMap);
    });
  </script>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card title="Gym Locations">
      <LeafletMap id="gym-map" height={60} bind:this={map} />
    </Card>
  
    <Card title="Gyms by Category">
      <LeafletMap id="category-map" height={60} bind:this={categorizedMap} />
    </Card>
  </div>
  