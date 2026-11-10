<template>
  <label
    :class="[
      'inline-flex items-start gap-3 cursor-pointer select-none',
      disabled ? 'cursor-not-allowed opacity-50' : '',
    ]"
  >
    <div class="relative mt-0.5 flex shrink-0">
      <input
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        class="peer sr-only"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <div
        :class="[
          'flex size-5 items-center justify-center rounded border-2 transition-all duration-150',
          modelValue
            ? 'border-primary-500 bg-primary-500'
            : 'border-zinc-300 bg-white',
          !disabled ? 'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-200' : '',
        ]"
      >
        <svg
          v-if="modelValue"
          class="size-3 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>

    <div class="flex flex-col gap-0.5">
      <span class="text-sm font-medium text-zinc-800">
        <slot />
      </span>
      <span v-if="description" class="text-xs text-zinc-500">{{ description }}</span>
    </div>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: boolean
  description?: string
  disabled?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
