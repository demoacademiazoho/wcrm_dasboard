<template>
  <div class="flex flex-col gap-4">
    <!-- Tab bar -->
    <div
      :class="[
        'flex',
        variant === 'pills'
          ? 'gap-1 rounded-lg bg-zinc-100 p-1'
          : 'gap-0 border-b border-zinc-200',
      ]"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        :disabled="tab.disabled"
        :class="[
          'flex items-center gap-2 text-sm font-medium transition-all duration-150 outline-none',
          'focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-40',
          variant === 'pills'
            ? [
                'rounded-md px-3 py-1.5',
                activeId === tab.id
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-700',
              ]
            : [
                'border-b-2 px-4 py-2.5 -mb-px',
                activeId === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300',
              ],
        ]"
        @click="select(tab.id)"
      >
        <svg v-if="tab.icon" class="size-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="tab.icon" />
        </svg>
        {{ tab.label }}
        <span
          v-if="tab.badge !== undefined"
          :class="[
            'rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none',
            activeId === tab.id
              ? 'bg-primary-100 text-primary-700'
              : 'bg-zinc-200 text-zinc-600',
          ]"
        >
          {{ tab.badge }}
        </span>
      </button>
    </div>

    <!-- Panel -->
    <slot :active-id="activeId" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

export interface Tab {
  id: string
  label: string
  icon?: string
  badge?: number | string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    tabs: Tab[]
    modelValue?: string
    variant?: 'underline' | 'pills'
  }>(),
  {
    variant: 'underline',
  },
)

const emit = defineEmits<{
  'update:modelValue': [id: string]
}>()

const activeId = ref(props.modelValue ?? props.tabs[0]?.id ?? '')

watch(() => props.modelValue, (val) => { if (val) activeId.value = val })

function select(id: string) {
  activeId.value = id
  emit('update:modelValue', id)
}
</script>
