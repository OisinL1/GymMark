<script lang="ts">
    import { currentGyms } from "$lib/runes.svelte";
    let { gyms } = $props();
  </script>
  
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Title</th>
        <th>Category</th>
        <th>Capacity</th>
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>
    </thead>
    <tbody>
      {#each currentGyms.gyms as gym}
        <tr>
          <td>{gym.title}</td>
          <td>{gym.category}</td>
          <td>{gym.capacity}</td>
          <td>{gym.lat}</td>
          <td>{gym.lng}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  