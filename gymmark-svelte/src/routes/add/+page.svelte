<script lang="ts">
    import { loggedInUser, subTitle, currentDataSets } from "$lib/runes.svelte";
    import { gymmarkService } from "$lib/gymmark-service";
    import { refreshGymMap } from "$lib/gymmark-utils";
    import Card from "$lib/ui/Card.svelte";
    import { onMount } from "svelte";
    import AddForm from "./AddForm.svelte";
    import type { Gym } from "$lib/types/gymmark-types";
    import GymList from "$lib/ui/GymList.svelte";
    import { browser } from "$app/environment";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
  
    subTitle.text = "Gym Manager";
    let map: any;
    let gyms: Gym[] = [];
    
  
    onMount(async () => {
      gyms = await gymmarkService.getGyms(loggedInUser.token);
      await refreshGymMap(map);
});
function gymAdded(gym:Gym) {
    map.addMarker(gym.lat, gym.lng, "");
    map.moveTo(gym.lat, gym.lng);
  }
  </script>
  
  <div class="columns">
    <div class="column">
      <Card title="Gyms added to Date">
        {#if browser}
        <LeafletMap id="add-map" height={30} bind:this={map} />
        {/if}
        <GymList {gyms} />
      </Card>
    </div>
    <div class="column">
      <Card title="Please Add a Gym">
        <AddForm gymEvent={gymAdded}/>
      </Card>
    </div>
  </div>
  