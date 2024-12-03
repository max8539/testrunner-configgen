<script setup lang="ts">
  import { useStorageData } from '@/composables'
  import type { ConfigType } from '@/types'
  import { Dialog, InputText, Textarea } from 'primevue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Button } from 'primevue'

  const router = useRouter()
  const storageData = useStorageData()

  const projectName = ref("")
  const configStr = ref("")
  const isSubmitNew = ref(false)
  const showJsonError = ref(false)

  const createExisting = () => {
    let configJson: ConfigType
    try {
      configJson = JSON.parse(configStr.value) as ConfigType
      storageData.value = {
        projects: [
          {
            name: projectName.value,
            lastModified: Date.now(),
            exported: false,
            showErrors: true,
            config: configJson
          },
          ...storageData.value.projects
        ]
      }
      router.push(`/editor?project=${projectName.value}&displayerror`)
    } catch {
      showJsonError.value = true
    }
  }
  const createNew = () => {
    storageData.value = {
      projects: [
        {
          name: projectName.value,
          lastModified: Date.now(),
          exported: false,
          showErrors: false,
          config: {
            verbose: 1,
            first_failure_exit: false,
            score_exit_code: false,
            tests: [{
              expect_error: false,
              run_cmd: "",
              skip: false
            }]
          }
        },
        ...storageData.value.projects
      ]
    }
    router.push(`/editor?project=${projectName.value}`)
  }

  const submitForm = () => {
    if (isSubmitNew.value) {
      createNew()
    } else {
      createExisting()
    }
  }
</script>

<template>
  <div>
    <div class="text-left pb-2">

    </div>
    <Button text as="router-link" to="/" label="Back" />
    <h1 class="pb-4 text-center text-4xl font-bold">Add New Project</h1>
    <form class="w-full max-w-[960px] mx-auto" @submit.prevent="submitForm">
      <div class="pb-4">
        <label class="font-bold" for="create-name">Project Name</label>
        <InputText v-model="projectName" id="create-name" required fluid />
      </div>
      <div class="grid grid-cols-2">
        <div class="w-full pr-2 border-r border-r-slate-300 dark:border-r-slate-700">
          <div class="pb-1 text-center text-slate-600 dark:text-slate-400">Either</div>
          <h2 class="text-center text-xl font-bold pb-2">Import an Existing Configuration</h2>
          <div class="pb-2">
            <label for="create-name">
              <div class="font-bold">Paste an existing configuration here</div>
              <div class="text-xs">Copy the entire content of an existing <span class="font-mono">testconfig.json</span> file and paste it here.</div>
            </label>
            <Textarea 
              v-model="configStr" 
              id="create-config" 
              :required="!isSubmitNew"
              class="!font-mono"
              rows="10"
              fluid 
            />
          </div>
          <div>
            <Button 
              type="submit"
              @click="() => {isSubmitNew = false}"
              label="Import Configuration"
              fluid
            />
          </div>
        </div>
        <div class="w-full pl-2">
          <div class="pb-1 text-center text-slate-600 dark:text-slate-400">Or</div>
          <h2 class="text-center text-xl font-bold pb-2">Create a New Configuration</h2>
          <div class="py-32">
            <Button 
              type="submit"
              @click="() => {isSubmitNew = true}"
              label="Create New Configuration"
              fluid
            />
          </div>
        </div>
      </div>
    </form>

    <Dialog
      v-model:visible="showJsonError"
      modal
      class="w-11/12 sm:w-[37rem]"
    >
      <template #container>
        <div class="p-4 text-slate-800 dark:text-slate-200">
          <div>
            An error occured while reading your configuration. Ensure that the configuration has valid JSON syntax, then try again. 
            You may find it useful to open your <span class="font-mono">testconfig.json</span> file in a code editor and fix any issues that it identifies.
          </div>
          <div class="pt-2">
            <Button 
              type="button"
              text
              label="Close"
              autofocus
              class="block"
              @click="() => {showJsonError = false}"
            />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
  
</template>
