import type { PageServerLoad } from "./$types";
import { gymmarkService } from "$lib/gymmark-service";
import { loggedInUser } from "$lib/runes.svelte";

export const load: PageServerLoad = async ({ params }) => {
    
  const gym = await gymmarkService.getGymById(params.id, loggedInUser.token);
  return { gym };
};
