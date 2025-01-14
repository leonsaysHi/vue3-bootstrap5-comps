<template>
  <template v-for="(opt, idx) in props.options" :key="opt.value">
    <form-check
      v-model="checkBoxesValue[idx]"
      :value="opt.value"
      :switch="props.switch"
      :button="props.button"
      :readonly="readonly"
      :required="required"
      :disabled="disabled"
      @change="handleChange(opt.value)"
    >{{ opt.text }}</form-check>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FormCheck from '@/FormCheck.vue'

import type { Size, Option } from '@types/comp-fields'

interface IProps {
  modelValue?: (string | number | boolean)[]
  options?: Option[]
  itemClass?: string
  readonly?: boolean
  required?: boolean
  disabled?: boolean
  inline?: boolean
  switch?: boolean
  button?: boolean
  buttonSize?: Size
  isValid?: boolean
  isInvalid?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  value: () => [],
  options: () => [],
  uncheckValue: false,
  buttonSize: 'md'
})

const emit = defineEmits([
  'update:modelValue' // (String | Number | Boolean)[]
])

const localValue = computed({
  get () {
    return Array.isArray(props.modelValue) ? props.modelValue.slice() : []
  },
  set (newVal) {
    emit('update:modelValue', newVal)
  }
})
const checkBoxesValue = computed(() => {
  return props.options
    .map(opt => localValue.value.includes(opt.value) ? opt.value : false)
})

const handleChange = (val: string | number | boolean) => {
  const newValue = localValue.value.slice()
  const idx = newValue.findIndex((v) => v === val)
  if (idx === -1) {
    newValue.push(val)
  } else {
    newValue.splice(idx, 1)
  }
  localValue.value = newValue
}
</script>
