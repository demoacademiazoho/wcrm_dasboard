<template>
  <div class="fixed bottom-3 right-3 z-40 flex items-center gap-1.5">
    <span
      class="size-1.5 rounded-full shrink-0"
      :class="config.env === 'Production' ? 'bg-emerald-400' : 'bg-primary-400'"
    />
    <span class="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
      v{{ config.version }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useWidgetConfigStore } from '@/stores/widgetConfig'

const { config } = useWidgetConfigStore()
</script>
