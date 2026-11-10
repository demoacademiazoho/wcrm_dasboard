<template>
  <label
    :for="htmlFor"
    :class="[
      'block text-sm font-semibold tracking-wide uppercase',
      required ? 'after:content-[\'*\'] after:ml-1 after:text-red-500' : '',
      disabled ? 'text-zinc-400' : 'text-zinc-600',
    ]"
  >
    <slot />
  </label>
</template>

<script setup lang="ts">
defineProps<{
  htmlFor?: string
  required?: boolean
  disabled?: boolean
}>()
</script>