import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// ─── Theme ───────────────────────────────────────────────────────────────────
// Change this to any Tailwind color name (e.g. 'blue', 'violet', 'rose')
// then update the @theme block in src/style.css to match.
export const themeColor = 'blue'
// ─────────────────────────────────────────────────────────────────────────────

export type Env = 'Sandbox' | 'Production'

interface EnvConfig {
  baseUrl: string
  apiKey: string
}

interface WidgetConfig {
  title: string
  description: string
  version: string
  domain: string
  env: Env
  envConfig: Record<Env, EnvConfig>
}

export const useWidgetConfigStore = defineStore('widgetConfig', () => {
  const config = ref<WidgetConfig>({
    title: 'Widget Title',
    description: 'Widget Description',
    version: '1.0.0',
    domain: '',
    env: 'Production',
     envConfig: {
      Sandbox: {
        baseUrl: '',
        apiKey: '',
      },
      Production: {
        baseUrl: '',
        apiKey: '',
      },
    },
  })

  const activeEnvConfig = computed<EnvConfig>(() => config.value.envConfig[config.value.env])

  const baseUrl = computed(() => activeEnvConfig.value.baseUrl)
  const apiKey = computed(() => activeEnvConfig.value.apiKey)

  const updateConfig = (newConfig: Partial<WidgetConfig>) => {
    config.value = { ...config.value, ...newConfig }
  }

  const setEnv = (env: Env) => {
    config.value.env = env
  }

  const updateEnvConfig = (env: Env, envConfig: Partial<EnvConfig>) => {
    config.value.envConfig[env] = { ...config.value.envConfig[env], ...envConfig }
  }

  return { config, activeEnvConfig, baseUrl, apiKey, updateConfig, setEnv, updateEnvConfig }
})
