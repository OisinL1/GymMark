<script lang="ts">
    import Coordinates from "$lib/ui/Coordinates.svelte";
  
    // Categories for gyms
    const gymCategories = [
      "CrossFit",
      "Bodybuilding",
      "Yoga",
      "Cardio",
      "Strongman",
      "Calisthenics"
    ];
  
    // Gym-related state variables
    let gymName = $state("");      // Gym name
    let lat = $state(52.160858);   // Latitude
    let lng = $state(-7.15242);    // Longitude
    let capacity = $state(0);      // Gym capacity
    let selectedCategory = $state("CrossFit");  // Selected gym category
    let description = $state(""); // Gym description
  
    // Simulate the add gym function (API integration later)
    async function addGym() {
      console.log(`Adding gym: ${gymName}`);
      console.log(`Lat: ${lat}, Lng: ${lng}`);
      console.log(`Capacity: ${capacity}`);
      console.log(`Category: ${selectedCategory}`);
      console.log(`Description: ${description}`);
  
      // Placeholder for API call: 
      // const res = await fetch("/dashboard/addgym", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     title: gymName,
      //     lat,
      //     lng,
      //     capacity,
      //     category: selectedCategory,
      //     description
      //   })
      // });
  
      // Temporary success log for testing
      console.log("Gym successfully added (simulated response)");
    }
  </script>
  
  <div>
    <!-- Gym Name -->
    <div class="field">
      <label class="label" for="gymName">Gym Name:</label>
      <input bind:value={gymName} class="input" id="gymName" name="gymName" type="text" placeholder="Enter gym name" />
    </div>
  
    <!-- Gym Capacity -->
    <div class="field">
      <label class="label" for="capacity">Capacity:</label>
      <input bind:value={capacity} class="input" id="capacity" name="capacity" type="number" placeholder="Enter gym capacity" />
    </div>
  
    <!-- Gym Category -->
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
  
    <!-- Gym Description -->
    <div class="field">
      <label class="label" for="description">Description:</label>
      <textarea bind:value={description} class="textarea" id="description" name="description" placeholder="Enter gym description"></textarea>
    </div>
  
    <!-- Coordinates Component for map -->
    <div>
      <Coordinates bind:lat bind:lng />
    </div>
  
    <!-- Submit Button to Add Gym -->
    <div class="field">
      <div class="control">
        <!-- svelte-ignore event_directive_deprecated -->
        <button on:click={addGym} class="button is-success is-fullwidth">Add Gym</button>
      </div>
    </div>
  </div>
  