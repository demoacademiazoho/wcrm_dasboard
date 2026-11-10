<template>
  <div class="relative inline-flex" @mouseenter="show = true" @mouseleave="show = false">
    <slot />

    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      leave-active-class="transition-all duration-100 ease-in"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="show && text"
        :class="[
          'pointer-events-none absolute z-50 w-max max-w-56',
          'rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs text-white shadow-lg',
          positionClasses[position ?? 'top'],
        ]"
        role="tooltip"
      >
        {{ text }}
        <!-- Arrow -->
        <span :class="['absolute size-2 rotate-45 bg-zinc-900', arrowClasses[position ?? 'top']]" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Position = 'top' | 'bottom' | 'left' | 'right'

defineProps<{
  text?: string
  position?: Position
}>()

const show = ref(false)

const positionClasses: Record<Position, string> = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full top-1/2 -translate-y-1/2 mr-2',
  right:  'left-full top-1/2 -translate-y-1/2 ml-2',
}

const arrowClasses: Record<Position, string> = {
  top:    'top-full left-1/2 -translate-x-1/2 -translate-y-1/2',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2',
  left:   'left-full top-1/2 -translate-y-1/2 -translate-x-1/2',
  right:  'right-full top-1/2 -translate-y-1/2 translate-x-1/2',
}
</script>
