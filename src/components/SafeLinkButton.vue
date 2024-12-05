<script setup lang="ts">
  import { Button } from "primevue"

  defineProps<{
    text?: boolean
    label: string
    href: string
    target?: string
  }>()
</script>

<template>
  <Button as="a" :href :target rel="noopener noreferrer" />
</template>
