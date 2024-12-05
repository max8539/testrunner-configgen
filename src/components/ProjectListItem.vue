<script setup lang="ts">
  import type { ProjectType } from '@/types'
  import { onMounted, onUnmounted, ref } from 'vue'
  import { useRouter } from 'vue-router';

  const props = defineProps<{
    project: ProjectType,
    index: number
  }>()

  const router = useRouter()

  const lastModifiedDisplay = ref("")
  let lastModifiedInterval: ReturnType<typeof setTimeout>

  const lastModifiedStr = (dataDate: number) => {
    const minute = 60000
    const hour = minute * 60
    const day = hour * 24

    const dateDiff = Date.now() - dataDate
    if (dateDiff < minute) {
      return "Last modified less than a minute ago."
    } else if (dateDiff < minute * 2) {
      return "Last modified 1 minute ago."
    } else if (dateDiff < hour) {
      return `Last modified ${Math.floor(dateDiff / minute)} minutes ago.`
    } else if (dateDiff < hour * 2) {
      return "Last modified 1 hour ago."
    } else if (dateDiff < day) {
      return `Last modified ${Math.floor(dateDiff / hour)} hours ago.`
    } else if (dateDiff < day * 2) {
      return "Last modified 1 day ago."
    } else {
      return `Last modified ${Math.floor(dateDiff / day)} days ago.`
    }
  }

  onMounted(() => {
    lastModifiedDisplay.value = lastModifiedStr(props.project.lastModified)
    lastModifiedInterval = setInterval(() => {
      lastModifiedDisplay.value = lastModifiedStr(props.project.lastModified)
    }, 60000)
  })

  onUnmounted(() => {
    clearInterval(lastModifiedInterval)
  })
</script>

<template>
  <button 
    class="w-full first:rounded-t-md bg-green-200 dark:bg-green-800 hover:bg-slate-200 dark:hover:bg-slate-800 focus:bg-slate-200 dark:focus:bg-slate-800 border-b border-b-slate-500 motion-safe:transition-colors"
    @click="() => {router.push(`/editor?project=${index}`)}"
  >
    <div class="w-full px-2 py-1">
      <div class="text-left text-lg font-bold">{{ project.name }}</div>
      <div class="text-left text-sm">{{ project.exported ? "Exported | " : "Not exported | " }}{{ lastModifiedDisplay }}</div>
    </div>
  </button>
</template>
