<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  modelValue: any[],
  val: any
  label?: string,
  disabled?: boolean
}>()

const emit = defineEmits(["update:modelValue"])

const checked = computed({
  get () {
    return props.modelValue.includes(props.val)
  },
  set (push) {
    console.log(push, props)
    if (props.disabled) return

    if (push) {
      const newArr = [...props.modelValue, props.val]
      console.log('pushing', newArr)
      emit('update:modelValue', newArr)
    } else {
      const index = props.modelValue.indexOf(props.val)
      if (index >= 0) {
        const newArr = props.modelValue.toSpliced(index, 1)
        console.log('slicing', newArr)
        emit('update:modelValue', newArr)
      }
    }

  }
})
</script>

<template>
  <div class="checkbox_wrapper" :class="{ disabled: props.disabled }">
    <div class="checkbox" @click="checked = !checked">
      <font-awesome-icon v-if="checked" :icon="['fas', 'square-check']" size="lg" />
      <font-awesome-icon v-else :icon="['fad', 'square']" size="lg" />
    </div>
    <div v-if="props.label" class="label">
      {{ props.label }}
    </div>
  </div>
</template>

<style scoped>
.checkbox_wrapper {
  display: grid;
  gap: 0.5rem;

  grid-template-columns: auto 1fr;
}

.checkbox {
  cursor: pointer;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.checkbox_wrapper.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
