<script setup lang="ts">
  import ProjectListItem from '@/components/ProjectListItem.vue';
  import { useStorageData } from '@/composables'
  import { useRouter } from 'vue-router';
  
  const storageData = useStorageData()
  const router = useRouter()
</script>

<template>
  <div>
    <h1 class="p-4 text-green-500 text-4xl text-center font-bold">Configuration Generator for test-runner.js</h1>
    <div class="p-2">
      <h2 class="font-bold pb-2 text-2xl">Select a Project</h2>
      <div class="w-full max-w-[960px] mx-auto bg-green-200 dark:bg-green-800 border border-slate-500 rounded-md drop-shadow-md">
        <ProjectListItem 
          v-for="project of storageData.projects" 
          :key="storageData.projects.indexOf(project)" 
          :project 
          :index="storageData.projects.indexOf(project)"
        />
        <button 
          type="button"
          class="w-full rounded-b-md bg-green-200 dark:bg-green-800 hover:bg-slate-200 dark:hover:bg-slate-800 focus:bg-slate-200 focus:dark:bg-slate-800 motion-safe:transition-colors"
          @click="() => {router.push('/create')}"
        >
          <div class="p-3 text-lg text-center font-bold">
            Add New Project
          </div>
        </button>
      </div>
    </div>
  </div>
</template>