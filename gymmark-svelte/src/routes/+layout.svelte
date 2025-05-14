<script lang="ts">
    import { browser } from "$app/environment";
    import { loggedInUser } from "$lib/runes.svelte";
    import Heading from "$lib/ui/Heading.svelte";
    import Menu from "$lib/ui/Menu.svelte";
  
    if (browser) {
      const savedLoggedInUser = localStorage.gymmark;
      if (savedLoggedInUser) {
        const session = JSON.parse(savedLoggedInUser);
        loggedInUser.email = session.email;
        loggedInUser.name = session.name;
        loggedInUser.token = session.token;
        loggedInUser._id = session._id;
        loggedInUser.isAdmin = session.isAdmin;
      }
    }
  </script>
  
  <div class="container">
    {#if loggedInUser.email}
      <Menu />
      <Heading />
    {/if}
    <slot />
  </div>
  