<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>



<Header />

<main>

  <slot />
</main>

<Footer />





<style>
  :global(body) {
    font-family: 'Arial', sans-serif; 
    padding: 0;
    margin: 0;
    background-color: #ffff;
  }

</style>