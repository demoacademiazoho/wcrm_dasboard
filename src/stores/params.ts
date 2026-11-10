import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Params {
  id?: string
  module?: string
  [key: string]: any
}

export const useParamsStore = defineStore('params', () => {
  const params = ref<Params>({})

  function updateParams(data: any) {
    const normalizedParams: Params = { ...data }
    console.log(data);
    
    // Normalize ID
    if (data.EntityId) {
      normalizedParams.id = Array.isArray(data.EntityId) ? data.EntityId[0] : data.EntityId
    } else if (data.id) {
      normalizedParams.id = data.id
    }

    // Normalize Module
    if (data.Entity) {
      normalizedParams.module = data.Entity
    } else if (data.module) {
      normalizedParams.module = data.module
    }

    params.value = normalizedParams

    // Remove redundant keys
    delete params.value.Entity
    delete params.value.EntityId
    console.log(params.value);
    
  }

  return { params, updateParams }
})
