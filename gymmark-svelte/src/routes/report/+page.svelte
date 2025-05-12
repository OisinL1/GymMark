<script lang="ts">
    import { subTitle } from "$lib/runes.svelte";
    import Card from "$lib/ui/Card.svelte";
    import GymList from "$lib/ui/GymList.svelte";
  
    subTitle.text = "Gyms Added to date";
  </script>
  
  <Card title="Gyms!">
    <GymList />
  </Card>
  