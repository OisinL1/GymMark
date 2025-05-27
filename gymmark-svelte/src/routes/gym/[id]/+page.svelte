<script lang="ts">
    import Card from "$lib/ui/Card.svelte";
    import UploadWidget from "$lib/ui/UploadWidget.svelte";
    import DeleteImageWidget from "$lib/ui/UploadWidget.svelte";
    import { subTitle, loggedInUser } from "$lib/runes.svelte";
    import type { Gym } from "$lib/types/gymmark-types.js";
    import { gymmarkService } from "$lib/gymmark-service";

  
    let { data  } = $props();
    // svelte-ignore non_reactive_update
        let gym = data?.gym ?? null;
  
    let token: string = loggedInUser?.token || '';
  
    if (gym && gym.title) {
      subTitle.text = `Details for ${gym.title}`;
    }
  
    let images = $state<string[]>([]);
  
    if (gym?.images?.length) {
      images = gym.images.slice();
    }

    function onRefreshGym(refreshedGym: Gym) {
  if (!refreshedGym) return;

  gym = { ...refreshedGym };

  images = refreshedGym.images?.slice() ?? [];
}


  async function deleteImage(index: number) {
  if (!gym) return;
  if (!gym._id) return;

  const imageUrl = images[index];
  try {
    const deleted = await gymmarkService.deleteGymImage(gym._id, imageUrl);
    if (!deleted) return alert("Failed to delete image.");

    const refreshedGym = await gymmarkService.refreshCurrentGym(gym._id, token);
    if (refreshedGym) onRefreshGym(refreshedGym);
  } catch (error) {
    console.error("Delete error:", error);
    alert("Error deleting image.");
  }
}
  </script>
  
  {#if gym}
    <Card title="Gym Info">
      <ul class="space-y-1">
        <li><strong>Category:</strong> {gym.category}</li>
        <li><strong>Capacity:</strong> {gym.capacity}</li>
        <li><strong>Description:</strong> {gym.description}</li>
        <li><strong>Coordinates:</strong> {gym.lat}, {gym.lng}</li>
      </ul>
    </Card>
  
    <Card title="Image Gallery">
        <div class="columns is-multiline">
            {#each images as img, index}
              <div class="column is-one-quarter">
                <div class="box has-position-relative" style="position: relative;">
                  <!-- svelte-ignore a11y_img_redundant_alt -->
                  <img src={img} alt="Gym image" class="image is-fullwidth" />
                  <!-- svelte-ignore event_directive_deprecated -->
                  <button
                    class="delete is-small"
                    style="position: absolute; top: 0.5rem; right: 0.5rem;"
                    on:click={() => deleteImage(index)}
                    aria-label="Delete image"
                  ></button>
                </div>
              </div>
            {/each}
          </div>
          {#if gym._id}
            <UploadWidget
              gymId={gym._id}
              token={token} 
              onRefreshGym={onRefreshGym}
            />
          {/if}
         </Card>
  {:else}
    <p>Gym data not found.</p>
  {/if}
  