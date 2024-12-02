<script setup lang="ts">
  import { Button } from 'primevue';
</script>

<template>
  <div>
    <h1 class="text-green-500 text-4xl font-bold">Configuration Generator for test-runner.js</h1>
    <Button 
      label="Editor Page"
      as="router-link"
      to="/editor"
      fluid 
    />
  </div>
</template>