import type { SelectOption } from '@/components/form/Select.vue'
import type { FieldConfig } from '@/interfaces/formTypes'

const yearOptions: SelectOption[] = Array.from({ length: 30 }, (_, i) => {
  const y = 2025 - i
  return { label: String(y), value: String(y) }
})

export const modelsByMake: Record<string, SelectOption[]> = {
  toyota:     [{ label: 'Corolla', value: 'corolla' }, { label: 'Camry', value: 'camry' }, { label: 'RAV4', value: 'rav4' }],
  ford:       [{ label: 'Focus', value: 'focus' }, { label: 'Mustang', value: 'mustang' }, { label: 'Explorer', value: 'explorer' }],
  bmw:        [{ label: '3 Series', value: '3series' }, { label: '5 Series', value: '5series' }, { label: 'X5', value: 'x5' }],
  mercedes:   [{ label: 'C-Class', value: 'cclass' }, { label: 'E-Class', value: 'eclass' }, { label: 'GLC', value: 'glc' }],
  honda:      [{ label: 'Civic', value: 'civic' }, { label: 'Accord', value: 'accord' }, { label: 'CR-V', value: 'crv' }],
  chevrolet:  [{ label: 'Malibu', value: 'malibu' }, { label: 'Equinox', value: 'equinox' }, { label: 'Silverado', value: 'silverado' }],
  volkswagen: [{ label: 'Golf', value: 'golf' }, { label: 'Passat', value: 'passat' }, { label: 'Tiguan', value: 'tiguan' }],
  audi:       [{ label: 'A3', value: 'a3' }, { label: 'A6', value: 'a6' }, { label: 'Q5', value: 'q5' }],
}

// Flat list used as the field's options — the form filters it based on make
const allModelOptions: SelectOption[] = Object.values(modelsByMake).flat()

export const workOrderFields: FieldConfig[] = [
  // ── Vehicle tab ───────────────────────────────────────────────
  {
    id: 'make',
    type: 'select',
    label: 'Make',
    placeholder: 'Select make',
    required: true,
    span: 2,
    tab: 'vehicle',
    options: [
      { label: 'Toyota', value: 'toyota' },
      { label: 'Ford', value: 'ford' },
      { label: 'BMW', value: 'bmw' },
      { label: 'Mercedes-Benz', value: 'mercedes' },
      { label: 'Honda', value: 'honda' },
      { label: 'Chevrolet', value: 'chevrolet' },
      { label: 'Volkswagen', value: 'volkswagen' },
      { label: 'Audi', value: 'audi' },
    ],
  },
  {
    id: 'model',
    type: 'select',
    label: 'Model',
    placeholder: 'Select model',
    required: true,
    span: 2,
    tab: 'vehicle',
    dependsOn: 'make',
    options: allModelOptions,
  },
  {
    id: 'year',
    type: 'select',
    label: 'Year',
    placeholder: 'Select year',
    required: true,
    span: 1,
    tab: 'vehicle',
    options: yearOptions,
  },
  {
    id: 'mileage',
    type: 'input',
    inputType: 'number',
    label: 'Mileage (km)',
    placeholder: 'e.g. 52000',
    span: 1,
    tab: 'vehicle',
  },
  {
    id: 'vin',
    type: 'input',
    label: 'VIN',
    placeholder: '17-character VIN',
    tooltip: 'The Vehicle Identification Number is a 17-character code found on the dashboard or door jamb.',
    span: 1,
    tab: 'vehicle',
  },
  {
    id: 'registration',
    type: 'input',
    label: 'Registration Plate',
    placeholder: 'e.g. ABC-1234',
    span: 2,
    tab: 'vehicle',
  },
  {
    id: 'divider-service',
    type: 'divider',
    label: 'Ownership',
    span: 6,
    tab: 'vehicle',
  },
  {
    id: 'ownerSearch',
    type: 'search',
    label: 'Search Owner',
    placeholder: 'Search by name or email...',
    debounce: 300,
    hint: 'Link this vehicle to an existing customer',
    span: 6,
    tab: 'vehicle',
  },

  // ── Service tab ───────────────────────────────────────────────
  {
    id: 'serviceType',
    type: 'select',
    label: 'Service Type',
    placeholder: 'Select service',
    required: true,
    span: 3,
    tab: 'service',
    options: [
      { label: 'Routine Service / Oil Change', value: 'routine' },
      { label: 'Brake Inspection & Repair', value: 'brakes' },
      { label: 'Tyre Replacement', value: 'tyres' },
      { label: 'Engine Diagnostics', value: 'diagnostics' },
      { label: 'Electrical Fault', value: 'electrical' },
      { label: 'Transmission Service', value: 'transmission' },
      { label: 'Air Conditioning', value: 'aircon' },
      { label: 'Body & Paint', value: 'body' },
      { label: 'Warranty Claim', value: 'warranty' },
    ],
  },
  {
    id: 'appointmentDate',
    type: 'date',
    label: 'Appointment Date',
    required: true,
    span: 3,
    tab: 'service',
  },
  {
    id: 'notes',
    type: 'textarea',
    label: 'Service Notes',
    placeholder: 'Describe the issue or service required...',
    rows: 3,
    maxLength: 500,
    span: 6,
    tab: 'service',
  },
  {
    id: 'divider-options',
    type: 'divider',
    label: 'Options',
    span: 6,
    tab: 'service',
  },
  {
    id: 'urgent',
    type: 'toggle',
    label: 'Priority',
    description: 'Flag this work order for priority handling',
    span: 3,
    tab: 'service',
  },
  {
    id: 'loanerCar',
    type: 'toggle',
    label: 'Loaner Car',
    description: 'Customer requires a loaner vehicle',
    span: 3,
    tab: 'service',
  },
]
