<script lang="ts">
    import { currentDataSets } from "$lib/runes.svelte";
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import Card from "$lib/ui/Card.svelte";
    import { browser } from "$app/environment";
  </script>
  
  <div class="columns">
    <div class="column">
      <Card title="Total Capacity By Category">
        {#if browser}
        <Chart data={currentDataSets.capacityByCategory} type="bar" />
        {/if}
      </Card>
    </div>
  
    <div class="column">
      <Card title="Gym Count By Category">
        {#if browser}
        <Chart data={currentDataSets.countByCategory} type="pie" />
        {/if}
      </Card>
    </div>
  </div>
  