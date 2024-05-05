<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  modelValue: number
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
</script>

<template>
  <div class="page_switcher">
    <button :disabled="value <= 1" @click="value--">
      <font-awesome-icon :icon="['fad', 'arrow-left']" />
    </button>
    <div class="current_page">
      {{ value }}
    </div>
    <button @click="value++">
      <font-awesome-icon :icon="['fad', 'arrow-right']" />
    </button>
  </div>
</template>

<style scoped>
.page_switcher {
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
  justify-content: center;
  text-align: center;

  gap: 1rem;

  font-weight: bold;

  font-size: 1.5rem;
  line-height: 3rem;
}
</style>
