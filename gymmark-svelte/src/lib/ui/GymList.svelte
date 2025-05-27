<script lang="ts">
  import { currentGyms } from "$lib/runes.svelte";
  import { goto } from "$app/navigation";
  import { gymmarkService } from "$lib/gymmark-service";
  import { loggedInUser } from "$lib/runes.svelte";

  let { gyms } = $props();
  const token = loggedInUser.token;

  function viewGym(id: string) {
    goto(`/gym/${id}`); 
  }

  async function deleteGymById(id: string) {
  console.log("[TABLE] deleteGymById() called with ID:", id);

  const success = await gymmarkService.deleteGym(id, token);
  if (!success) {
    console.error("Failed to delete gym with ID:", id);
  }
}

</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Title</th>
      <th>Category</th>
      <th>Capacity</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Gallery</th>
      <th>Delete</th>

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
        <td>
          <button class="button is-link is-small" onclick={() => viewGym(gym._id)}>
            View / Upload
          </button>         
        </td>
        <td>
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button class="button is-danger is-small" onclick={() => deleteGymById(gym._id)}>
            <span class="icon is-small">
              <i class="fas fa-trash"></i>
            </span>
          </button>
        </td>

      

      </tr>
    {/each}
  </tbody>
</table>
