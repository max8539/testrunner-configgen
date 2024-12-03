<script setup lang="ts">
import { LOCALSTORAGE_KEY } from '@/composables';
import { Button } from 'primevue';
import { onMounted, ref } from 'vue';

  const display = ref("")
  const reload = () => {
    display.value = localStorage.getItem(LOCALSTORAGE_KEY) || ""
  }

  onMounted(reload)
</script>

<template>
  <div class="w-full p-2">
    <div class="font-bold">localStorage content:</div>
    <div class="font-mono">{{ display }}</div>
    <Button label="Reload" @click="reload" />
  </div>
</template>