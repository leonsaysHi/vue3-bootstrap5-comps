<template>
  <div :class="computedWrapperClass">
    <input
      ref="checkboxEl"
      :id="`check-input-${$.uid}`"
      type="checkbox"
      :checked="props.modelValue === props.value"
      :class="computedInputClass"
      :readonly="readonly"
      :required="required"
      :disabled="disabled"
      @click="handleClick"
    />
    <label :for="`check-input-${$.uid}`" :class="computedLabelClass">
      <slot></slot
    ></label>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Size } from '@types/comp-fields'

interface IProps {
  modelValue?: boolean | string | number
  value?: boolean | string | number
  uncheckValue?: boolean | string | number
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
  value: true,
  uncheckValue: false,
  buttonSize: 'md'
})

const emit = defineEmits(['update:modelValue', 'change'])

const checkboxEl = ref()

const computedWrapperClass = computed(() => {
  return [
    props.button ? 'd-inline-block' : 'form-check',
    props.inline && 'form-check-inline',
    props.switch && 'form-switch'
  ]
})
const computedInputClass = computed(() => {
  return [props.button ? 'btn-check' : 'form-check-input']
})
const computedLabelClass = computed(() => {
  return [
    'form-check-label',
    props.button && 'btn',
    props.button && checkboxEl.value?.checked
      ? 'btn-primary'
      : 'btn-outline-secondary',
    props.button && `btn-${props.buttonSize}`,
    !props.button && 'form-check-label'
  ]
})
const handleClick = (ev: Event) => {
  const newVal = ev.target?.checked ? props.value : props.uncheckValue
  emit('update:modelValue', newVal)
  emit('change', newVal)
}
</script>
