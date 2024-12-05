<script setup lang="ts">
  import { useStorageData } from '@/composables'
  import { useClipboard } from '@vueuse/core'
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Button, Checkbox } from 'primevue'
  import SafeLink from '@/components/SafeLink.vue'
  import StepItem from '@/components/StepItem.vue'
import SafeLinkText from '@/components/SafeLinkText.vue'

  const route = useRoute()
  const router = useRouter()
  const storageData = useStorageData()
  const clipboard = useClipboard()
  const prettyPrint = ref(false)
  const configStr = ref("")
  const configPrettyPrint = ref("")

  const handleCopy = () => {
    if (prettyPrint.value) {
      clipboard.copy(configPrettyPrint.value)
    } else {
      clipboard.copy(configStr.value)
    }
  }

  onMounted(() => {
    if (
      !Number.isInteger(Number(route.query.project)) || 
      Number(route.query.project) < 0 ||
      Number(route.query.project) >= storageData.value.projects.length
    ) {
      router.push("/")
      return
    }
    const configObject = storageData.value.projects[Number(route.query.project)].config
    configStr.value = JSON.stringify(configObject)
    configPrettyPrint.value = JSON.stringify(configObject, null, "  ")
  })
</script>

<template>
  <div>
    <div class="text-left pb-2">
      <Button 
        text 
        as="router-link" 
        :to="`/editor?project=${$route.query.project}`" 
        label="Back to Configuration Editor" 
      />
    </div>
    <h1 class="pb-4 text-center text-4xl font-bold">Your Configuration is Ready!</h1>
    <div class="grid grid-cols-2">
      <div class="w-full pr-2 border-r border-r-slate-300 dark:border-r-slate-700">
        <h2 class="text-center text-xl font-bold pb-2">Your Configuration</h2>
        <div class="pb-2">
          <div v-if="prettyPrint" class="border border-slate-500 rounded-md p-1">
            <div class="w-full h-72 overflow-auto">
              <pre class="font-mono">{{ configPrettyPrint }}</pre>
            </div>
          </div>
          <div v-else class="border border-slate-500 rounded-md p-1">
            <div class="w-full h-72 overflow-y-auto font-mono break-all">{{ configStr }}</div>
          </div>
        </div>
        
        <div class="flex gap-2 pb-2">
          <Checkbox v-model="prettyPrint" binary input-id="export-pretty" />
          <label for="export-pretty">Pretty-print JSON</label>
        </div>
        <div v-if="clipboard.isSupported">
          <Button 
            type="button"
            :label="clipboard.copied.value ? 'Copied!' : 'Copy to Clipboard'"
            fluid
            @click="handleCopy"
          />
        </div>
      </div>

      <div class="w-full h-auto pl-2">
        <h2 class="text-center text-xl font-bold pb-2">Next Steps</h2>
        <StepItem step="1">
          Create a file named testconfig.json in the root directory of your project, paste the entire configuration in that file, and save the file.
        </StepItem>
        <StepItem step="2">
          <span>
            Download and install 
            <SafeLinkText 
              href="https://nodejs.org/en" 
              target="_blank" 
              text="Node.js" 
            /> 
            if it is not already installed on your system.
          </span>
        </StepItem>
        <StepItem step="3">
          <span>
            Download the 
            <SafeLinkText 
              href="https://github.com/max8539/test-runner/blob/main/test-runner.js" 
              target="_blank"
              text="test-runner.js script"
            />
            and save it to the root directory of your project.
          </span>
        </StepItem>
        <StepItem step="4">
          Use Node.js to run test-runner.js and start testing your project!
        </StepItem>
        
        <div class="pt-4">
          See the 
          <SafeLink 
            href="https://github.com/max8539/test-runner/blob/main/README.md" 
            target="_blank"
          >
            <span class="text-green-600 dark:text-green-400 hover:underline">test-runner.js documentation</span>
          </SafeLink> 
          for more information about how to use the test-runner.js script to help you test your project.
        </div>
      </div> 
    </div>
    <div class="pt-2 mx-auto text-center">
      <Button text as="router-link" to="/" label="Back to Homepage" />
    </div> 
  </div>
</template>