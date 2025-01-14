<template>
  <div>
    <ul class="nav nav-tabs flex-nowrap" :class="tabsClass" ref="navEl"></ul>

    <!-- Tab panes -->
    <div class="tab-content" :class="[ props.tabsOnly && 'd-none']">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, onMounted } from 'vue'

interface IProps {
  modelValue?: number
  tabsClass?: string
  tabsOnly?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: 0
})

const navEl = ref()
const active = computed(() => props.modelValue)
const tabs = ref([])
const emits = defineEmits(['update:modelValue'])
const selectTab = (tab) => {
  emits('update:modelValue', tab)
}
onMounted(() => {
  selectTab(0)
})

provide('tabsState', {
  navEl,
  active,
  tabs,
  selectTab
})
</script>
