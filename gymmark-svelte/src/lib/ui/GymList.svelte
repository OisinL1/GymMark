<script lang="ts">
    export let gyms = [
      {
        name: "CrossFit Gold",
        category: "CrossFit",
        capacity: 100,
        description: "A top-tier CrossFit gym with state-of-the-art equipment.",
        lat: "52.161290",
        lng: "-7.51540"
      },
      {
        name: "Iron Body Gym",
        category: "Bodybuilding",
        capacity: 200,
        description: "Dedicated bodybuilding gym with specialized training zones.",
        lat: "52.261290",
        lng: "-7.231540"
      },
      {
        name: "Zen Yoga Center",
        category: "Yoga",
        capacity: 50,
        description: "Peaceful yoga space for mindful practice.",
        lat: "52.361290",
        lng: "-7.241540"
      }
    ];
  </script>
  
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Gym Name</th>
        <th>Category</th>
        <th>Capacity</th>
        <th>Description</th>
        <th>Location</th>
      </tr>
    </thead>
    <tbody>
      {#each gyms as gym}
        <tr>
          <td>{gym.name}</td>
          <td>{gym.category}</td>
          <td>{gym.capacity}</td>
          <td>{gym.description}</td>
          <td>
            <span>{gym.lat}, {gym.lng}</span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  