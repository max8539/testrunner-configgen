<script setup lang="ts">
  import { useStorageData } from '@/composables';
import { RouterLink, useRoute, useRouter } from 'vue-router';

  const route = useRoute()
  const router = useRouter()
  const storageData = useStorageData()
</script>

<template>
  <div>
    <div>name: {{ $route.query.project }}</div>
    <div>displayerror: {{ $route.query.displayerror !== undefined }}</div>
    <h1>Config editing page.</h1>
    <RouterLink to="/">Homepage</RouterLink>
  </div>
</template>