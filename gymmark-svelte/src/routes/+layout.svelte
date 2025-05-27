<script lang="ts">
    import { gymmarkService } from "$lib/gymmark-service";
    import { loggedInUser } from "$lib/runes.svelte";
    import Heading from "$lib/ui/Heading.svelte";
    import Menu from "$lib/ui/Menu.svelte";
    import { onMount } from "svelte";
  
    onMount(async () => {
    await gymmarkService.restoreSession()
  });
  </script>
  
  <div class="container">
    {#if loggedInUser.email}
      <Menu />
      <Heading />
    {/if}
    <slot />
  </div>
  