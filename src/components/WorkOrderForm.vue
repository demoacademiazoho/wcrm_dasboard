<template>
  <Card :padded="false" shadow class="w-full">
    <!-- Header -->
    <template #header>
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-primary-500">
          Service Department
        </p>
        <h1 class="mt-0.5 text-lg font-bold text-zinc-900">{{ title }}</h1>
      </div>
    </template>

    <form class="flex flex-col gap-0" @submit.prevent="handleSubmit">
      <!-- Tabs -->
      <div class="px-6 pt-4">
        <Tabs v-model="activeTab" :tabs="formTabs" variant="underline" />
      </div>

      <!-- Tab panels -->
      <div class="px-6 py-5">
        <div class="grid grid-cols-6 gap-4">
          <template v-for="field in activeFields" :key="field.id">

            <!-- Divider -->
            <div v-if="field.type === 'divider'" :class="spanClass(field.span)">
              <Divider>{{ field.label }}</Divider>
            </div>

            <!-- Input -->
            <div v-else-if="field.type === 'input'" :class="spanClass(field.span)">
              <Tooltip v-if="field.tooltip" :text="field.tooltip" position="top">
                <Input
                  v-model="formState[field.id] as string"
                  :id="field.id"
                  :label="field.label"
                  :type="(field as any).inputType ?? 'text'"
                  :placeholder="(field as any).placeholder"
                  :hint="field.hint"
                  :required="field.required"
                  :error="errors[field.id]"
                />
              </Tooltip>
              <Input
                v-else
                v-model="formState[field.id] as string"
                :id="field.id"
                :label="field.label"
                :type="(field as any).inputType ?? 'text'"
                :placeholder="(field as any).placeholder"
                :hint="field.hint"
                :required="field.required"
                :error="errors[field.id]"
              />
            </div>

            <!-- Select -->
            <div v-else-if="field.type === 'select'" :class="spanClass(field.span)">
              <Select
                v-model="formState[field.id] as string"
                :id="field.id"
                :label="field.label"
                :placeholder="(field as any).placeholder"
                :options="resolvedOptions(field as any)"
                :disabled="!!(field as any).dependsOn && !formState[(field as any).dependsOn]"
                :hint="field.hint"
                :required="field.required"
                :error="errors[field.id]"
              />
            </div>

            <!-- Textarea -->
            <div v-else-if="field.type === 'textarea'" :class="spanClass(field.span)">
              <Textarea
                v-model="formState[field.id] as string"
                :id="field.id"
                :label="field.label"
                :placeholder="(field as any).placeholder"
                :hint="field.hint"
                :rows="(field as any).rows"
                :max-length="(field as any).maxLength"
                :required="field.required"
                :error="errors[field.id]"
              />
            </div>

            <!-- Date -->
            <div v-else-if="field.type === 'date'" :class="spanClass(field.span)">
              <DatePicker
                v-model="formState[field.id] as string"
                :id="field.id"
                :label="field.label"
                :min="(field as any).min"
                :max="(field as any).max"
                :hint="field.hint"
                :required="field.required"
                :error="errors[field.id]"
              />
            </div>

            <!-- Search -->
            <div v-else-if="field.type === 'search'" :class="spanClass(field.span)">
              <div class="flex flex-col gap-1.5">
                <Label v-if="field.label" :html-for="field.id">{{ field.label }}</Label>
                <SearchInput
                  v-model="formState[field.id] as string"
                  :placeholder="(field as any).placeholder"
                  :debounce="(field as any).debounce"
                />
                <p v-if="field.hint" class="text-xs text-zinc-500">{{ field.hint }}</p>
              </div>
            </div>

            <!-- Toggle -->
            <div v-else-if="field.type === 'toggle'" :class="spanClass(field.span)">
              <Toggle
                v-model="formState[field.id] as boolean"
                :description="(field as any).description"
              >
                {{ field.label }}
              </Toggle>
            </div>

            <!-- Checkbox -->
            <div v-else-if="field.type === 'checkbox'" :class="spanClass(field.span)">
              <Checkbox
                v-model="formState[field.id] as boolean"
                :description="(field as any).description"
              >
                {{ field.label }}
              </Checkbox>
            </div>

          </template>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between gap-3 border-t border-zinc-100 px-6 py-4">
        <Button variant="ghost" size="sm" type="button" @click="handleDraft">
          Save Draft
        </Button>
        <div class="flex gap-2">
          <Button variant="secondary" type="button" @click="handleCancel">
            Cancel
          </Button>
          <Button variant="accent" type="submit">
            Create Order
          </Button>
        </div>
      </div>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import Input from '@/components/form/Input.vue'
import Select from '@/components/form/Select.vue'
import Textarea from '@/components/form/Textarea.vue'
import Checkbox from '@/components/form/Checkbox.vue'
import Toggle from '@/components/form/Toggle.vue'
import DatePicker from '@/components/form/DatePicker.vue'
import SearchInput from '@/components/form/SearchInput.vue'
import Label from '@/components/form/Label.vue'
import Button from '@/components/buttons/Button.vue'
import Card from '@/components/main/Card.vue'
import Tabs from '@/components/main/Tabs.vue'
import Divider from '@/components/main/Divider.vue'
import Tooltip from '@/components/main/Tooltip.vue'
import { workOrderFields, modelsByMake } from '@/config/workOrderFields'
import type { FieldConfig } from '@/interfaces/formTypes'
import type { Tab } from '@/components/main/Tabs.vue'
import { useToast } from '@/composables/useToast'

const props = withDefaults(
  defineProps<{
    title?: string
    fields?: FieldConfig[]
  }>(),
  {
    title: 'New Work Order',
    fields: () => workOrderFields,
  },
)

export type FormState = Record<string, string | boolean>

const toast = useToast()

const formTabs: Tab[] = [
  {
    id: 'vehicle',
    label: 'Vehicle',
    icon: 'M8 7h8m-8 5h5m-5 4h3M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z',
  },
  {
    id: 'service',
    label: 'Service',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
]

const activeTab = ref('vehicle')

const activeFields = computed(() =>
  props.fields.filter((f) => (f.tab ?? 'vehicle') === activeTab.value),
)

const formState = reactive<FormState>(
  Object.fromEntries(
    props.fields.map((f) => [f.id, f.type === 'checkbox' || f.type === 'toggle' ? false : '']),
  ),
)

const errors = reactive<Record<string, string>>({})

const spanClasses: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
}

function spanClass(span?: number): string {
  return spanClasses[span ?? 6] ?? 'col-span-6'
}

function resolvedOptions(field: { options: any[]; dependsOn?: string }) {
  if (!field.dependsOn) return field.options
  const parentValue = formState[field.dependsOn] as string
  return parentValue ? (modelsByMake[parentValue] ?? []) : []
}

watch(() => formState['make'], () => {
  formState['model'] = ''
})

function validate(): boolean {
  let valid = true
  props.fields.forEach((field) => {
    if (field.required && !formState[field.id]) {
      errors[field.id] = `${field.label ?? field.id} is required`
      valid = false
    } else {
      delete errors[field.id]
    }
  })
  return valid
}

function handleSubmit() {
  if (!validate()) return
  console.log('Work order:', { ...formState })
  toast.success('Work Order Created', 'The vehicle has been added to the queue.')
}

function handleDraft() {
  console.log('Draft:', { ...formState })
  toast.info('Draft Saved', 'Work order saved as draft.')
}

function handleCancel() {
  toast.warning('Cancelled', 'No changes were saved.')
}
</script>
