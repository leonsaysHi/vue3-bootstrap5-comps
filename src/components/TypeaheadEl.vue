<template>
  <div :class="[`drop${direction}`]">
    <input
      v-model="model"
      type="text"
      class="form-control"
      :class="{ [computedClass]: true }"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <div class="dropdown-menu" :class="{ show: props.options.length }">
      <template v-for="opt in options" :key="opt.value">
        <li>
          <a
            class="dropdown-item"
            :class="{ disabled: opt.disabled }"
            :aria-disabled="opt.disabled"
            @click="handleSelect(opt)"
            >{{ opt.text }}</a
          >
        </li>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Option, Size } from '../types/comp-fields'
import { computed } from 'vue'
interface IProps {
  searchString?: string
  options?: Option[]
  placeholder?: string
  disabled?: boolean
  size?: Size
  direction?: 'down' | 'up'
}
const props = withDefaults(defineProps<IProps>(), {
  options: () => [] as Option[],
  size: 'md',
  direction: 'down'
})
const emit = defineEmits([
  'update:searchString', // string
  'select' // string | number | boolean
])
const model = computed({
  get: () => props.searchString,
  set: (val) => emit('update:searchString', val)
})
const computedClass = computed(() => {
  const result = []
  if (props.size !== 'md') {
    result.push(props.size)
  }
  return result.map((str) => `btn-${str}`).join(' ')
})
const handleSelect = (opt: Option) => {
  emit('select', opt.value)
  model.value = ''
}
</script>

<style lang="scss" scoped>
.dropup {
  .dropdown-menu {
    top: auto;
    bottom: 100%;
    margin-top: 0;
    // margin-bottom: var(--#{$prefix}dropdown-spacer);
  }
}
</style>
