<script setup lang="ts">
import {defineProps, computed, defineEmits} from 'vue'
import { vElementVisibility } from '@vueuse/components'
import { ref } from 'vue'
import router from '@/router'

const props = defineProps(['modelValue'])
const emit = defineEmits(["update:modelValue"])

const buttonToggled = computed({
  get() {
    return props.modelValue
  },
  set(newState: Boolean) {
    emit('update:modelValue', newState)
  }
})

const buttonIcon = computed(() => {
  if (buttonToggled.value === null) return ['far', 'square']
  if (buttonToggled.value === true) return ['fad', 'square-check']
  if (buttonToggled.value === false) return ['fad', 'square-xmark']
})

const buttonClass = computed(() => {
  if (buttonToggled.value === null) return ''
  if (buttonToggled.value === true) return 'toggledOn'
  if (buttonToggled.value === false) return 'toggledOff'
})

function updateState() {
  switch (buttonToggled.value) {
    case null:
      buttonToggled.value = true;
      break
    case true:
      buttonToggled.value = false;
      break;
    case false:
    default:
      buttonToggled.value = null;
      break
  }
}
</script>

<template>
  <button :class="buttonClass" @click="updateState">
    <slot></slot>
    <font-awesome-icon style="padding-left: .5rem" :icon="buttonIcon" transform="grow-2" />
  </button>
</template>
