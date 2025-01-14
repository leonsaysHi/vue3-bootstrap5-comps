<template>
  <div :class="computedClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface IProps {
  alignV?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  alignH?: 'start' | 'center' | 'end' | 'between' | 'around'
  gap?: string | number
  gapX?: string | number
  gapY?: string | number
}

const props = withDefaults(defineProps<IProps>(), {
})

const computedClass = computed(() => {
  return [
    'row',
    props.alignV && `align-items-${props.alignV}`,
    props.alignH && `justify-content-${props.alignH}`,
    props.gap && `g-${props.gap}`,
    props.gapX && `gx-${props.gapX}`,
    props.gapY && `gy-${props.gapY}`
  ]
})
</script>
