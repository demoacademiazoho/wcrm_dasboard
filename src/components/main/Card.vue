<template>
  <div
    :class="[
      'bg-white rounded-xl overflow-hidden',
      padded ? '' : '',
      shadow ? 'shadow-md' : 'border border-zinc-200',
    ]"
  >
    <!-- Header -->
    <div
      v-if="title || $slots.header"
      class="flex items-center justify-between gap-4 border-b border-zinc-100 px-5 py-4"
    >
      <div v-if="title || description" class="flex flex-col gap-0.5">
        <h3 class="text-sm font-semibold text-zinc-800">{{ title }}</h3>
        <p v-if="description" class="text-xs text-zinc-500">{{ description }}</p>
      </div>
      <slot name="header" />
    </div>

    <!-- Body -->
    <div :class="padded ? 'p-5' : ''">
      <slot />
    </div>

    <!-- Footer -->
    <div
      v-if="$slots.footer"
      class="flex items-center justify-end gap-2 border-t border-zinc-100 px-5 py-3"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    padded?: boolean
    shadow?: boolean
  }>(),
  {
    padded: true,
    shadow: false,
  },
)
</script>
