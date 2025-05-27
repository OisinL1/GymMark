<script lang="ts">
    import Coordinates from "$lib/ui/Coordinates.svelte";
    import { loggedInUser } from "$lib/runes.svelte";
    import { gymmarkService } from "$lib/gymmark-service";
    import type { Gym } from "$lib/types/gymmark-types";
  
    const gymCategories = [
      "CrossFit",
      "Bodybuilding",
      "Yoga",
      "Cardio",
      "Strongman",
      "Calisthenics"
    ];
  
   
    let gymName = $state("");      
    let lat = $state(52.160858);   
    let lng = $state(-7.15242);    
    let capacity = $state(0);      
    let selectedCategory = $state("CrossFit"); 
    let description = $state(""); 
    let { gymEvent = null } = $props();

    let message = $state("Please Donate");
  
    
    async function addGym() {
        console.log("[FORM] addGym() called with:", {
      title: gymName,
      lat, lng, capacity, category: selectedCategory, description
    });
    if (!gymName || !lat || !lng || !capacity || !selectedCategory || !description) {
      message = "Please fill in all required fields.";

      return;
    }

    const gym: Gym = {
        title: gymName,
        lat,
        lng,
        capacity,
        category: selectedCategory,
        description,
        userid: loggedInUser._id,
    };

    const success = await gymmarkService.addGym(gym, loggedInUser.token);
   
    if (!success) {
      message = "Failed to add gym — please try again.";
      return;
    }
    if (gymEvent) gymEvent(gym);
    message = `Gym "${gymName}" added successfully!`;
    
    gymName = "";
    lat = 0;
    lng = 0;
    capacity = 0;
    selectedCategory = "CrossFit";
    description = "";
  }
  </script>
  
  <div>
    <div class="field">
      <label class="label" for="gymName">Gym Name:</label>
      <input bind:value={gymName} class="input" id="gymName" name="gymName" type="text" placeholder="Enter gym name" />
    </div>
    <div class="field">
      <label class="label" for="capacity">Capacity:</label>
      <input bind:value={capacity} class="input" id="capacity" name="capacity" type="number" placeholder="Enter gym capacity" />
    </div>
    <div class="field">
      <label class="label" for="category">Category:</label>
      <div class="select">
        <select bind:value={selectedCategory} id="category" name="category">
          {#each gymCategories as category}
            <option>{category}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="field">
      <label class="label" for="description">Description:</label>
      <textarea bind:value={description} class="textarea" id="description" name="description" placeholder="Enter gym description"></textarea>
    </div>
    <div>
      <Coordinates bind:lat bind:lng />
    </div>
    <div class="field">
      <div class="control">
        <!-- svelte-ignore event_directive_deprecated -->
        <button on:click={addGym} class="button is-success is-fullwidth">Add Gym</button>
      </div>
    </div>
  </div>
  