<script lang="ts">
    import { subTitle } from "$lib/runes.svelte";
    import Card from "$lib/ui/Card.svelte";
    import AddForm from "./AddForm.svelte";
  
    subTitle.text = "Add a Gym";
  </script>
  
  <Card title="Please Add a Gym!">
    <AddForm />
  </Card>
  