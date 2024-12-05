<script setup lang="ts">
  defineProps<{
    step: string
  }>()
</script>

<template>
  <div class="grid grid-cols-[auto_1fr] pb-4">
    <div class="w-12 h-12 p-2 border border-slate-400 dark:border-slate-600 rounded-full text-2xl text-center">{{ step }}</div>
    <div class="h-auto min-h-12 flex flex-col pl-2 justify-center">
      <slot />
    </div>
  </div>
  
</template>