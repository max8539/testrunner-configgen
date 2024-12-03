<script setup lang="ts">
  import { RouterView } from 'vue-router'
import DisplayStorage from './components/DisplayStorage.vue';
</script>

<template>
  <div class="p-2 sm:p-4">
    <div class="w-full 2xl:w-[1280px] mx-auto p-4 bg-white dark:bg-black rounded-lg sm:rounded-2xl drop-shadow-lg sm:drop-shadow-2xl text-slate-800 dark:text-slate-200">
      <RouterView />
      <DisplayStorage />
    </div>
  </div>  
</template>
