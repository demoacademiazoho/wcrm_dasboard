<template>
  <div class="flex flex-col gap-1.5">
    <Label v-if="label" :html-for="id" :required="required" :disabled="disabled">
      {{ label }}
    </Label>

    <div class="relative">
      <span
        v-if="$slots.prefix"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400"
      >
        <slot name="prefix" />
      </span>

      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-zinc-900',
          'placeholder:text-zinc-400',
          'transition-all duration-150 outline-none',
          'focus:ring-2 focus:ring-offset-0',
          $slots.prefix ? 'pl-9' : '',
          $slots.suffix ? 'pr-9' : '',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
            : 'border-zinc-300 focus:border-primary-500 focus:ring-primary-100',
          disabled
            ? 'cursor-not-allowed bg-zinc-50 text-zinc-400'
            : 'hover:border-zinc-400',
        ]"
        v-bind="$attrs"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />

      <span
        v-if="$slots.suffix"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400"
      >
        <slot name="suffix" />
      </span>
    </div>

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
  </div>
</template>

<script setup lang="ts">
import Label from './Label.vue'

defineOptions({ inheritAttrs: false })

defineProps<{
  modelValue?: string | number
  id?: string
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>