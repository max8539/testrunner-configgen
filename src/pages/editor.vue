<script setup lang="ts">
  import { RouterLink, useRoute } from 'vue-router';

  const route = useRoute()
</script>

<template>
  <div>
    <div>name: {{ route.query.name }}</div>
    <div>displayerror: {{ !!route.query.displayerror }}</div>
    <h1>Config editing page.</h1>
    <RouterLink to="/">Homepage</RouterLink>
  </div>
</template>