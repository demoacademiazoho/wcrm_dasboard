import type { SelectOption } from '@/components/form/Select.vue'

export type FieldType = 'input' | 'select' | 'textarea' | 'checkbox' | 'toggle' | 'date' | 'divider' | 'search'

interface BaseField {
  id: string
  type: FieldType
  label?: string
  required?: boolean
  hint?: string
  tooltip?: string
  tab?: string
  /** Column span out of 6 (1–6) */
  span?: 1 | 2 | 3 | 4 | 5 | 6
}

export interface InputField extends BaseField {
  type: 'input'
  inputType?: string
  placeholder?: string
}

export interface SelectField extends BaseField {
  type: 'select'
  placeholder?: string
  options: SelectOption[]
  /** id of another field whose value filters this field's options */
  dependsOn?: string
}

export interface TextareaField extends BaseField {
  type: 'textarea'
  placeholder?: string
  rows?: number
  maxLength?: number
}

export interface CheckboxField extends BaseField {
  type: 'checkbox'
  description?: string
}

export interface ToggleField extends BaseField {
  type: 'toggle'
  description?: string
}

export interface DateField extends BaseField {
  type: 'date'
  placeholder?: string
  min?: string
  max?: string
}

export interface SearchField extends BaseField {
  type: 'search'
  placeholder?: string
  debounce?: number
}

export interface DividerField extends BaseField {
  type: 'divider'
}

export type FieldConfig =
  | InputField
  | SelectField
  | TextareaField
  | CheckboxField
  | ToggleField
  | DateField
  | SearchField
  | DividerField
