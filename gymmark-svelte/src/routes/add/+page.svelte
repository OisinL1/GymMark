<script lang="ts">
    import { loggedInUser, subTitle, currentDataSets } from "$lib/runes.svelte";
    import { gymmarkService } from "$lib/gymmark-service";
    import Card from "$lib/ui/Card.svelte";
    import { onMount } from "svelte";
    import AddForm from "./AddForm.svelte";
    import type { Gym } from "$lib/types/gymmark-types";
    import GymList from "$lib/ui/GymList.svelte";
    import { browser } from "$app/environment";
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
  
    subTitle.text = "Gym Manager";
    let gyms: Gym[] = [];
  
    onMount(async () => {
      gyms = await gymmarkService.getGyms(loggedInUser.token);
    });
  </script>
  
  <div class="columns">
    <div class="column">
      <Card title="Gyms added to Date">
        {#if browser}
        <Chart data={currentDataSets.countByCategory} type="bar" />
        {/if}
        <GymList {gyms} />
      </Card>
    </div>
    <div class="column">
      <Card title="Please Add a Gym">
        <AddForm/>
      </Card>
    </div>
  </div>
  