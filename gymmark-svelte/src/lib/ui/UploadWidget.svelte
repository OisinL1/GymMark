<script lang="ts">
    import { env } from "$env/dynamic/public";
    import { onMount } from "svelte";
    import { gymmarkService } from "$lib/gymmark-service";
    import type { Gym } from "$lib/types/gymmark-types";  
    
    export let gymId: string;
    // svelte-ignore export_let_unused
        export let token: string;
        export let onRefreshGym: (gym: Gym) => void; 
  
    let widget: any;
  
    const cldOptions = {
      cloudName: "dm90oqxqy",
      uploadPreset: "gymmark",
       
    };
  
    async function cldCallback(error: any, result: any) {
      if (!error && result.event === "success") {
        const url = result.info.secure_url;
        const uploaded = await gymmarkService.uploadGymImage(gymId, url);
        if (uploaded) {
          const refreshedGym = await gymmarkService.refreshCurrentGym(gymId, token);
          if(refreshedGym){
            onRefreshGym(refreshedGym);
          }
        }
      }
    }
  
    onMount(() => {
      function onIdle() {
        if (!widget) {
          // @ts-ignore
          widget = window.cloudinary.createUploadWidget(cldOptions, cldCallback);
        }
      }
      "requestIdleCallback" in window
        ? requestIdleCallback(onIdle)
        : setTimeout(onIdle, 1);
    });
  
    function handleClick() {
      if (widget) widget.open();
    }
  </script>
  
  <button class="button is-primary is-rounded" on:click|preventDefault={handleClick}>
    Upload Image
  </button>
  
  