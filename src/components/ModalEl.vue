<template>
  <Teleport to="#modals-holder">
    <div
      ref="modalEl"
      tabindex="-1"
      class="modal"
      data-bs-backdrop="static"
      :class="`${containerClass} modal-${size} ${isAnimated ? 'fade' : ''}`"
      :aria-hidden="!props.value || !props.isShown"
    >
      <div :class="`modal-dialog ${isCentered ? 'modal-dialog-centered' : ''}`">
        <div class="modal-content">
          <template v-if="!hideHeader && title">
            <div class="modal-header" :class="headerClass">
              <slot
                name="header"
                v-bind="{ handleCancel, handleOk }"
                :handle-cancel="handleCancel"
                :handle-ok="handleOk"
              >
                <h5 class="modal-title">
                  <slot name="title">{{ title }}</slot>
                </h5>
                <template v-if="!hideClose">
                  <button
                    type="button"
                    class="btn-close"
                    aria-label="close"
                    role="button"
                    :disabled="isBusy"
                    @click="handleCancel"
                  ></button>
                </template>
              </slot>
            </div>
          </template>
          <div class="modal-body" :class="bodyClass">
            <slot
              v-bind="{
                handleCancel,
                handleOk,
              }"
            />
          </div>
          <template v-if="!hideFooter">
            <div class="modal-footer" :class="footerClass">
              <slot
                name="footer"
                v-bind="{
                  handleCancel,
                  handleOk,
                  okTitle,
                  cancelTitle,
                  okVariant,
                  okDisabled,
                  cancelVariant,
                  cancelDisabled,
                  isBusy,
                }"
                :handle-cancel="handleCancel"
                :handle-ok="handleOk"
              >
                <template v-if="!hideCancel">
                  <slot
                    name="modal-cancel"
                    v-bind="{
                      handleCancel,
                      handleOk,
                      cancelTitle,
                      cancelDisabled,
                      cancelVariant,
                      isBusy,
                    }"
                  >
                    <button
                      :class="`btn btn-${cancelVariant}`"
                      :disabled="cancelDisabled || isBusy"
                      @click="handleCancel"
                    >
                      {{ cancelTitle }}
                    </button>
                  </slot>
                </template>
                <template v-if="!hideOk">
                  <slot
                    name="modal-ok"
                    v-bind="{
                      handleCancel,
                      handleOk,
                      okTitle,
                      okVariant,
                      okDisabled,
                      isBusy,
                    }"
                  >
                    <button
                      :class="`btn btn-${okVariant} d-flex align-items-center gap-2`"
                      :disabled="okDisabled || isBusy"
                      @click="handleOk"
                    >
                      {{ okTitle }}
                    </button>
                  </slot>
                </template>
              </slot>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
/*
// Show/hide modal using ref:
<Modal ref="myModalComponent" />
const myModalComponent = ref<Modal>()
myModalComponent.value?.show() | myModalComponent.value?.hide()

// Show/hide modal using show props:
<Modal v-model="[ref]" />
<Modal :is-shown="[boolean]" />

*/
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { Size } from '../types/comp-fields'
import { Modal } from 'bootstrap'

interface IProps {
  modelValue?: boolean
  isShown?: boolean
  title?: string
  size?: Size
  isBusy?: boolean
  hideHeader?:boolean
  hideFooter?: boolean
  hideOk?: boolean
  okDisabled?: boolean
  hideCancel?: boolean
  cancelDisabled?: boolean
  hideClose?: boolean
  cancelTitle?: string
  cancelVariant?: string
  okTitle?: string
  okVariant?: string
  headerClass?: string
  bodyClass?: string
  containerClass?: string
  footerClass?: string
  isAnimated?: boolean
  isCentered?: boolean
  hideOnKeyboard?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  size: 'md',
  cancelTitle: 'Cancel',
  cancelVariant: 'light',
  okTitle: 'Ok',
  okVariant: 'primary',
  isAnimated: true,
  hideOnKeyboard: true
})

const emit = defineEmits(['update:modelValue', 'cancel', 'ok'])

defineExpose({ show, hide })

const modalEl = ref()
const bsModal = ref()
onMounted(() => {
  if (modalEl.value) {
    bsModal.value = new Modal(modalEl.value, {
      backdrop: 'static'
    })
    modalEl.value.addEventListener('hide.bs.modal', () => {
      emit('update:modelValue', false)
    })
    modalEl.value.addEventListener('shown.bs.modal', () => {
      modalEl.value?.focus()
    })
  }
})

// Hide the Modal component, before unmount, to prevent the modal background from being saved
// along with page scroll disable when pressing the back button in the browser.
onUnmounted(() => {
  hide()
})

watch(
  () => props.modelValue || props.isShown,
  (val) => {
    if (!bsModal.value) {
      return
    }
    if (val) {
      show()
    } else {
      hide()
    }
  },
  { immediate: true }
)

function show () {
  bsModal.value?.show()
}

function hide () {
  bsModal.value?.hide()
}

function handleCancel () {
  hide()
  emit('cancel')
}

function handleOk () {
  emit('ok')
}
</script>
