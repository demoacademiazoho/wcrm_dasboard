<template>
  <!-- TOP layout -->
  <nav
    v-if="position === 'top'"
    class="flex items-center gap-1 bg-zinc-900 px-4 py-2 shadow-md"
  >
    <!-- Brand -->
    <div class="flex items-center gap-2 pr-4 mr-2 border-r border-zinc-700">
      <slot name="brand">
        <span class="text-sm font-bold tracking-widest uppercase text-white">
          {{ brand }}
        </span>
      </slot>
    </div>

    <!-- Nav items -->
    <div class="flex items-center gap-1 flex-1">
      <NavItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        :active="activeId === item.id"
        layout="top"
        @select="handleSelect"
      />
    </div>

    <!-- Trailing slot (actions, avatar, etc.) -->
    <div class="ml-auto flex items-center gap-2">
      <slot name="actions" />
    </div>
  </nav>

  <!-- SIDE layout -->
  <aside
    v-else
    :class="[
      'flex flex-col bg-zinc-900 shadow-lg transition-all duration-300',
      collapsed ? 'w-14' : position === 'left' ? 'w-52' : 'w-52',
    ]"
  >
    <!-- Brand -->
    <div class="flex items-center gap-2.5 px-4 py-4 border-b border-zinc-700 min-h-[56px]">
      <slot name="brand">
        <span
          v-if="!collapsed"
          class="text-sm font-bold tracking-widest uppercase text-white truncate"
        >
          {{ brand }}
        </span>
      </slot>

      <!-- Collapse toggle -->
      <button
        class="ml-auto shrink-0 rounded-md p-1 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
        @click="collapsed = !collapsed"
      >
        <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="collapsed
              ? 'M13 5l7 7-7 7M5 5l7 7-7 7'
              : 'M11 19l-7-7 7-7M19 19l-7-7 7-7'"
          />
        </svg>
      </button>
    </div>

    <!-- Nav items -->
    <div class="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
      <NavItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        :active="activeId === item.id"
        :collapsed="collapsed"
        layout="side"
        @select="handleSelect"
      />
    </div>

    <!-- Bottom slot -->
    <div v-if="$slots.bottom" class="p-2 border-t border-zinc-700">
      <slot name="bottom" :collapsed="collapsed" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavItem from './NavItem.vue'

export interface NavItemConfig {
  id: string
  label: string
  icon?: string // SVG path `d` attribute
}

export type NavPosition = 'top' | 'left' | 'right'

const props = withDefaults(
  defineProps<{
    position?: NavPosition
    brand?: string
    items?: NavItemConfig[]
    modelValue?: string
  }>(),
  {
    position: 'top',
    brand: 'AutoServ',
    items: () => [],
  },
)

const emit = defineEmits<{
  'update:modelValue': [id: string]
}>()

const activeId = ref(props.modelValue ?? props.items[0]?.id ?? '')
const collapsed = ref(false)

function handleSelect(id: string) {
  activeId.value = id
  emit('update:modelValue', id)
}
</script>
