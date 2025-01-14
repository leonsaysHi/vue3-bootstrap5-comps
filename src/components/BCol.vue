<template>
  <div :class="computedClass">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface IProps {
  col?: string | number
  sm?: string | number
  md?: string | number
  lg?: string | number
  xl?: string | number
}

const props = withDefaults(defineProps<IProps>(), {
  col: 1
})

const computedClass = computed(() => {
  return [
    'col',
    props.col && `col-${props.col}`,
    props.sm && `col-sm-${props.sm}`,
    props.md && `col-md-${props.md}`,
    props.lg && `col-lg-${props.lg}`,
    props.xl && `col-xl-${props.xl}`
  ]
})
</script>
