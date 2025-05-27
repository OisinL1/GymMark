<script lang="ts">
    import { loggedInUser, subTitle } from "$lib/runes.svelte";
    import Card from "$lib/ui/Card.svelte";
    import { gymmarkService } from "$lib/gymmark-service";
    import { onMount } from "svelte";
    import type { Gym } from "$lib/types/gymmark-types";
    
    import GymList from "$lib/ui/GymList.svelte";
  
    subTitle.text = "Gyms Added to date";

    let gyms: Gym[] = [];
  onMount(async () => {
    gyms = await gymmarkService.getGyms(loggedInUser.token);
  });

    
  </script>
  
  <Card title="Gyms!">
    <GymList {gyms} />
  </Card>
  