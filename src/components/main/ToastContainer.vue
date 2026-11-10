<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      aria-live="assertive"
    >
      <TransitionGroup
        move-class="transition-all duration-300"
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 translate-x-4 scale-95"
        enter-to-class="opacity-100 translate-x-0 scale-100"
        leave-from-class="opacity-100 translate-x-0 scale-100"
        leave-to-class="opacity-0 translate-x-4 scale-95"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'pointer-events-auto flex w-80 items-start gap-3 rounded-xl p-4 shadow-xl',
            'border backdrop-blur-sm',
            toastStyles[toast.type].container,
          ]"
          role="alert"
        >
          <div
            :class="[
              'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full',
              toastStyles[toast.type].icon,
            ]"
          >
            <component :is="icons[toast.type]" class="size-4" />
          </div>

          <div class="min-w-0 flex-1">
            <p :class="['text-sm font-semibold', toastStyles[toast.type].title]">
              {{ toast.title }}
            </p>
            <p v-if="toast.message" class="mt-0.5 text-xs leading-relaxed text-zinc-500">
              {{ toast.message }}
            </p>
          </div>

          <button
            :class="['shrink-0 rounded-md p-1 transition-colors', toastStyles[toast.type].close]"
            @click="toast$.remove(toast.id)"
          >
            <svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useToast } from '@/composables/useToast'

const toast$ = useToast()
const { toasts } = toast$

const toastStyles = {
  success: {
    container: 'bg-white border-emerald-200',
    icon: 'bg-emerald-100 text-emerald-600',
    title: 'text-zinc-800',
    close: 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100',
  },
  error: {
    container: 'bg-white border-red-200',
    icon: 'bg-red-100 text-red-600',
    title: 'text-zinc-800',
    close: 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100',
  },
  warning: {
    container: 'bg-white border-primary-200',
    icon: 'bg-primary-100 text-primary-600',
    title: 'text-zinc-800',
    close: 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100',
  },
  info: {
    container: 'bg-white border-blue-200',
    icon: 'bg-blue-100 text-blue-600',
    title: 'text-zinc-800',
    close: 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100',
  },
}

const icons = {
  success: h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2.5' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M5 13l4 4L19 7' }),
  ]),
  error: h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2.5' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M6 18L18 6M6 6l12 12' }),
  ]),
  warning: h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2.5' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z' }),
  ]),
  info: h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2.5' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }),
  ]),
}
</script>
