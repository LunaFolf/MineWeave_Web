<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

function toggleValue () {
  console.log('toggle!')
  value.value = !value.value
}
</script>

<template>
  <div class="toggleSwitch clickable" @click="toggleValue()">
    <div class="off">OFF</div>
    <div class="on">ON</div>

    <div class="switch" :class="{ on: value }"></div>
  </div>
</template>

<style scoped>
.toggleSwitch {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  background-color: var(--color-background-soft);
  height: 100%;
  padding: 0.5rem;
  overflow: hidden;
  border-radius: var(--border-radius);
}

.switch {
  position: absolute;
  background-color: #FFF2;
  height: 100%;
  padding: .5rem;
  width: 50%;
  left: 0;

  transition: left .125s ease;
}

.switch.on {
  left: 50%;
}
</style>
