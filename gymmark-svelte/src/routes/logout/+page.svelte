<script lang="ts">
    import { goto } from "$app/navigation";
    import { gymmarkService } from "$lib/gymmark-service";
  
    gymmarkService.clearSession();
    goto("/");
  </script>
  