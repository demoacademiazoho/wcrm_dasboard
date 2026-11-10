<template>
  <!-- Top layout: compact pill -->
  <button
    v-if="layout === 'top'"
    :class="[
      'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150 outline-none',
      'focus-visible:ring-2 focus-visible:ring-primary-400',
      active ? 'bg-primary-500 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white',
    ]"
    @click="$emit('select', item.id)"
  >
    <svg
      v-if="item.icon"
      class="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="item.icon" />
    </svg>
    {{ item.label }}
  </button>

  <!-- Side layout: full-width row -->
  <button
    v-else
    :title="collapsed ? item.label : undefined"
    :class="[
      'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-150 outline-none',
      'focus-visible:ring-2 focus-visible:ring-primary-400',
      collapsed ? 'justify-center' : '',
      active ? 'bg-primary-500 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white',
    ]"
    @click="$emit('select', item.id)"
  >
    <svg
      v-if="item.icon"
      class="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="item.icon" />
    </svg>

    <!-- Fallback icon when none provided -->
    <span
      v-else
      :class="[
        'flex size-5 shrink-0 items-center justify-center rounded text-xs font-bold',
        active ? 'bg-primary-400 text-white' : 'bg-zinc-700 text-zinc-300',
      ]"
    >
      {{ item.label[0] }}
    </span>

    <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
  </button>
</template>

<script setup lang="ts">
import type { NavItemConfig } from '@/components/main/NavBar.vue'

defineProps<{
  item: NavItemConfig
  active: boolean
  layout: 'top' | 'side'
  collapsed?: boolean
}>()

defineEmits<{
  select: [id: string]
}>()
</script>
