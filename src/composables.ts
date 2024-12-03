import { useStorage } from "@vueuse/core"
import type { StorageType } from "./types"

export const LOCALSTORAGE_KEY = 'testrunner-configgen'
export const useStorageData = () => {
  return useStorage<StorageType>(LOCALSTORAGE_KEY, {projects: []})
}
