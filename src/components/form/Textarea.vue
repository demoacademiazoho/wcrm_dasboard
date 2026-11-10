<template>
  <div class="flex flex-col gap-1.5">
    <Label v-if="label" :html-for="id" :required="required" :disabled="disabled">
      {{ label }}
    </Label>

    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows ?? 4"
      :class="[
        'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-zinc-900',
        'placeholder:text-zinc-400',
        'resize-y transition-all duration-150 outline-none',
        'focus:ring-2 focus:ring-offset-0',
        error
          ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
          : 'border-zinc-300 focus:border-primary-500 focus:ring-primary-100',
        disabled
          ? 'cursor-not-allowed bg-zinc-50 text-zinc-400'
          : 'hover:border-zinc-400',
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />

    <div class="flex items-start justify-between gap-2">
      <p v-if="error" class="flex items-center gap-1 text-xs text-red-600">
        <svg class="size-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>
        {{ error }}
      </p>
      <p v-else-if="hint" class="text-xs text-zinc-500">{{ hint }}</p>

      <p v-if="maxLength" class="ml-auto shrink-0 text-xs text-zinc-400">
        {{ String(modelValue ?? '').length }}/{{ maxLength }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Label from './Label.vue'

defineProps<{
  modelValue?: string
  id?: string
  label?: string
  placeholder?: string
  rows?: number
  maxLength?: number
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
