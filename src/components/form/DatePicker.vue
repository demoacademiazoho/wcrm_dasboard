<template>
  <div class="flex flex-col gap-1.5">
    <Label v-if="label" :html-for="id" :required="required" :disabled="disabled">
      {{ label }}
    </Label>

    <div class="relative">
      <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
        <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </span>

      <input
        :id="id"
        type="date"
        :value="modelValue"
        :min="min"
        :max="max"
        :disabled="disabled"
        :required="required"
        :class="[
          'w-full rounded-lg border bg-white py-2.5 pl-9 pr-3.5 text-sm text-zinc-900',
          'outline-none transition-all duration-150',
          'focus:ring-2 focus:ring-offset-0',
          '[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-40 [&::-webkit-calendar-picker-indicator]:hover:opacity-100',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
            : 'border-zinc-300 focus:border-primary-500 focus:ring-primary-100',
          disabled
            ? 'cursor-not-allowed bg-zinc-50 text-zinc-400'
            : 'cursor-pointer hover:border-zinc-400',
          !modelValue ? 'text-zinc-400' : 'text-zinc-900',
        ]"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <p v-if="error" class="flex items-center gap-1 text-xs text-red-600">
      <svg class="size-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
      {{ error }}
    </p>
    <p v-else-if="hint" class="text-xs text-zinc-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import Label from './Label.vue'

defineProps<{
  modelValue?: string
  id?: string
  label?: string
  min?: string
  max?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
