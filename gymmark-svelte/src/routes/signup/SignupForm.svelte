<script lang="ts">
    import { goto } from "$app/navigation";
    import UserCredentials from "$lib/ui/UserCredentials.svelte";
    import UserDetails from "$lib/ui/UserDetails.svelte";
    import { gymmarkService } from "$lib/gymmark-service";
  
    let firstName = "";
  let lastName = "";
  let email = "";
  let password = "";
  let message = "";

    async function signup() {
  console.log(`Attempting to sign up: ${firstName} ${lastName}, ${email}`);
  
  let success = await gymmarkService.signup({
    firstName,
    lastName,
    email,
    password
  });

  if (success) {
    goto("/login");
  } else {
    message = "Signup failed. Please try again.";
    email = "";
    password = "";
  }
}

  </script>
  
  <div class="box">
    <UserDetails bind:firstName bind:lastName />
    <UserCredentials bind:email bind:password />
    <button onclick={() => signup()} class="button">Sign Up</button>
    <p class="has-text-centered">
      Already have an account? <a href="/login" data-cy="login-redirect">Login Here</a>
    </p>
  </div>
  