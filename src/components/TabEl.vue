<template>
    <template v-if="navEl">
  <Teleport :to="navEl">
    <li class="nav-item" role="presentation">
      <slot name="button" :selectTab="selectTab" :active="active">
        <button
          class="nav-link"
           :class="[ isActive && 'active' ]"
          @click="selectTab(index)"
        >
          {{ props.title }}
        </button>
      </slot>
    </li></Teleport
  ></template>
  <div class="tab-pane" :class="[ isActive && 'active' ]"><slot></slot></div>
</template>

<script setup lang="ts">
import { computed, inject, watchEffect, getCurrentInstance } from 'vue'

interface IProps {
  title: string
}

const props = withDefaults(defineProps<IProps>(), {
})

const instance = getCurrentInstance()
const { tabs, navEl, selectTab, active } = inject('tabsState', {
  tabs: [],
  selectTab: () => ({})
})
const index = computed(() =>
  tabs.value.findIndex((target) => target.uid === instance.uid)
)
const isActive = computed(() => index.value === active.value)
watchEffect(() => {
  if (index.value === -1) {
    tabs.value.push(instance)
  }
})
</script>

<style scoped></style>
