import { reactive } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: number
  type: ToastType
  title: string
  message?: string
  duration?: number
}

const state = reactive<{ toasts: Toast[] }>({ toasts: [] })
let nextId = 0

function add(toast: Omit<Toast, 'id'>): number {
  const id = ++nextId
  state.toasts.push({ id, duration: 4000, ...toast })

  if (toast.duration !== 0) {
    setTimeout(() => remove(id), toast.duration ?? 4000)
  }

  return id
}

function remove(id: number): void {
  const idx = state.toasts.findIndex((t) => t.id === id)
  if (idx !== -1) state.toasts.splice(idx, 1)
}

export function useToast() {
  return {
    toasts: state.toasts,
    success: (title: string, message?: string) => add({ type: 'success', title, message }),
    error: (title: string, message?: string) => add({ type: 'error', title, message }),
    warning: (title: string, message?: string) => add({ type: 'warning', title, message }),
    info: (title: string, message?: string) => add({ type: 'info', title, message }),
    remove,
  }
}
