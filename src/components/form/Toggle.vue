<template>
  <label :class="['inline-flex items-start gap-3', disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer']">
    <div class="relative mt-0.5 shrink-0">
      <input
        type="checkbox"
        class="peer sr-only"
        :checked="modelValue"
        :disabled="disabled"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <div
        :class="[
          'flex h-5 w-9 items-center rounded-full border-2 transition-all duration-200 px-0.5',
          modelValue
            ? 'border-primary-500 bg-primary-500'
            : 'border-zinc-300 bg-zinc-200',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-200 peer-focus-visible:ring-offset-1',
        ]"
      >
        <span
          :class="[
            'size-3 rounded-full bg-white shadow transition-transform duration-200',
            modelValue ? 'translate-x-4' : 'translate-x-0',
          ]"
        />
      </div>
    </div>

    <div v-if="$slots.default || description" class="flex flex-col gap-0.5">
      <span class="text-sm font-medium text-zinc-800"><slot /></span>
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
