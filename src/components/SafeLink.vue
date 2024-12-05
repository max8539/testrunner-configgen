<script setup lang="ts">
  defineProps<{
    href: string,
    target?: string
  }>()
</script>

<template>
  <a :href :target rel="noopener noreferrer"><slot /></a>
</template>
