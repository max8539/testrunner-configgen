<script setup lang="ts">
  import SafeLink from './SafeLink.vue';
  
  defineProps<{
    href: string,
    target?: string
    text: string
  }>()
</script>

<template>
  <SafeLink :href :target>
    <span class="text-green-600 dark:text-green-400 hover:underline">
      {{ text }}
    </span>
  </SafeLink>
</template>