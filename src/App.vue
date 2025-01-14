<template>
  <div id="modals-holder"></div>
  <div class="container text-start">
    <h2>Typeahead</h2>
    <typeahead-el
      v-model:search-string="searchString"
      :options="filteredOptions"
      @select="handleSelect"
    ></typeahead-el>
    <div>Selected: {{ selectedValue }}</div>
    <hr />
    <h2>Modal</h2>
    <button type="button" class="btn btn-light" @click="showModal = true">Show modal</button>
    <modal-el v-model="showModal" title="Modal title">Modal body</modal-el>
    <hr />
    <h2>Layout</h2>
    <b-row>
      <b-col col="4">
        <p>Col: 4</p>
        <h2>Checbox</h2>
        <form-check v-model="singleCheck" />
        <div>Value: {{ singleCheck }}</div>
      </b-col>
      <b-col col="8">
        <p>Col: 8</p>
        <h2>Checboxes</h2>
        <form-check-group v-model="groupChecks" :options="options.slice(0, 5)" />
        <div>Value: {{ groupChecks }}</div>
      </b-col>
    </b-row>
    <hr />
    <h2>Tabs <small>wip</small></h2>
    <tabs-el>
      <tab-el title="tab1">content tab 1</tab-el>
      <tab-el title="tab2">contenbt tab 2</tab-el>
    </tabs-el>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import TypeaheadEl from '@/TypeaheadEl.vue'
import ModalEl from '@/ModalEl.vue'
import FormCheck from '@/FormCheck.vue'
import FormCheckGroup from '@/FormCheckGroup.vue'
import TabsEl from '@/TabsEl.vue'
import TabEl from '@/TabEl.vue'

const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('')

// typeahead
const selectedValue = ref()
const searchString = ref()
const options: { value: number, text: string }[] = new Array(20).fill({}).map((opt, idx) => ({
  value: idx,
  text: alpha.slice(idx, (idx + 5)).join('')
}))
const filteredOptions = computed(() => {
  const q = typeof searchString.value === 'string' ? searchString.value.trim().toLowerCase() : ''
  return q.length
    ? options.filter(opt => opt.text.toLowerCase().includes(q))
    : []
})
const handleSelect = (val) => {
  selectedValue.value = val
}

// modal
const showModal = ref(false)

// checkbox
const singleCheck = ref()
const groupChecks = ref()
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
