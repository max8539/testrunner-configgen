<script setup lang="ts">
  import { RouterView } from 'vue-router'
</script>

<template>
  <div class="sm:p-4">
    <div class="w-full 2xl:w-[1280px] mx-auto p-4 bg-slate-100 dark:bg-slate-900 sm:rounded-2xl sm:drop-shadow-2xl">
      <RouterView />
    </div>
  </div>  
</template>
