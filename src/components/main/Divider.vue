<template>
  <div
    :class="[
      'flex items-center gap-3',
      vertical ? 'flex-col h-full w-px' : 'flex-row w-full',
    ]"
  >
    <span :class="['shrink-0 bg-zinc-200', vertical ? 'w-px flex-1' : 'h-px flex-1']" />
    <span
      v-if="$slots.default"
      class="shrink-0 text-xs font-semibold uppercase tracking-widest text-zinc-400"
    >
      <slot />
    </span>
    <span v-if="$slots.default" :class="['shrink-0 bg-zinc-200', vertical ? 'w-px flex-1' : 'h-px flex-1']" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  vertical?: boolean
}>()
</script>
