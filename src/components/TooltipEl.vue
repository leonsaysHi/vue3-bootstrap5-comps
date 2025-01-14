<template>
  <div class="d-inline-flex">
    <div
      ref="referenceRef"
      class="reference"
      @mouseenter="show"
      @mouseleave="hide"
    >
      <slot></slot>
    </div>
    <div
      ref="floatingRef"
      class="floating p-2 text-bg-dark rounded-2"
      :class="[doShow && '--show']"
      :style="floatingStyles"
    >
      <div ref="floatingArrow" class="arrow bg-dark" :style="arrowStyles"></div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFloating, offset, arrow } from '@floating-ui/vue'

interface IProps {
  placement?: 'top' | 'right' | 'bottom' | 'left'
}

const props = withDefaults(defineProps<IProps>(), {
  placement: 'top'
})

const referenceRef = ref(null)
const floatingRef = ref(null)
const floatingArrow = ref(null)
const { floatingStyles, middlewareData, update } = useFloating(
  referenceRef,
  floatingRef,
  {
    placement: props.placement,
    middleware: [offset(6), arrow({ element: floatingArrow, padding: 5 })]
  }
)
const doShow = ref(false)
const arrowStyles = computed(() => {
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  }[props.placement.split('-')[0]]

  return {
    position: 'absolute',
    left:
      middlewareData.value.arrow?.x != null
        ? `${middlewareData.value.arrow.x}px`
        : '',
    top:
      middlewareData.value.arrow?.y != null
        ? `${middlewareData.value.arrow.y}px`
        : '',
    [staticSide]: '-4px'
  }
})
const show = () => {
  update()
  doShow.value = true
}
const hide = () => {
  doShow.value = false
}
</script>

<style scoped>
.reference { display: inline-flex; }
.floating {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  &.--show {
    opacity: 1;
  }
}
.arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
}
</style>
