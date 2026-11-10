<template>
  <div class="flex items-start justify-between gap-4 pb-5 border-b border-zinc-200 mb-6">
    <div class="flex flex-col gap-1">
      <div v-if="eyebrow" class="text-xs font-semibold uppercase tracking-widest text-primary-500">
        {{ eyebrow }}
      </div>
      <h1 class="text-xl font-bold text-zinc-900">{{ title }}</h1>
      <p v-if="description" class="text-sm text-zinc-500">{{ description }}</p>
    </div>

    <div v-if="$slots.actions" class="flex shrink-0 items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  eyebrow?: string
  description?: string
}>()
</script>
