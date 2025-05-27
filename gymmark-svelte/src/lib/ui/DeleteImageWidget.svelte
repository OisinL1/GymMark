<script lang="ts">
    import { gymmarkService } from "$lib/gymmark-service";
    import type { Gym } from "$lib/types/gymmark-types";
  
    export let gymId: string;
    export let token: string;
    export let imageUrl: string;
    export let onRefreshGym: (gym: Gym) => void;
  
    async function handleDelete() {
      const deleted = await gymmarkService.deleteGymImage(gymId, imageUrl);
      if (deleted) {
        const refreshedGym = await gymmarkService.refreshCurrentGym(gymId, token);
        if (refreshedGym) {
          onRefreshGym(refreshedGym);
        }
      } else {
        alert("Failed to delete image.");
      }
    }
  </script>
  
  <button class="button is-danger is-small" on:click={handleDelete}>
    Delete
  </button>
  