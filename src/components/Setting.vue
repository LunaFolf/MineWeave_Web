<script setup lang="ts">
import ToggleSwitch from "@/components/ToggleSwitch.vue";
import {computed} from "vue";

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  title: string,
  description?: string,
  keyName?: string,
  modelValue: any
}>()

const component = computed(() => {
  switch(typeof props.modelValue) {
    case "boolean":
      return ToggleSwitch
    default:
      return null
  }
})

const currentSetting = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const selectFields = {
  mod_loader: ['fabric', 'forge', 'liteloader', 'modloader', 'neoforge', 'rift', 'quilt', 'bukkit', 'folia', 'paper', 'purpur', 'spigot', 'sponge'],
  difficulty: ['peaceful', 'easy', 'normal', 'hard'],
  gamemode: ['survival', 'creative', 'adventure', 'spectator'],
  op_permission_level: [0,1,2,3,4],
  function_permission_level: [1,2,3,4]
}

const isKeyInSelects = computed(() => {
  return Object.keys(selectFields).includes(props.keyName)
})

</script>

<template>
  <div class="settings-line">
    <div class="title">
      {{ props.title }}
    </div>
    <div v-if="props.description && props.description.length" class="desc">
      {{ props.description }}
    </div>
    <div v-if="component" class="side">
      <component :is="component" v-model="currentSetting" />
    </div>
    <div v-else-if="isKeyInSelects" class="side">
      <select v-model="currentSetting">
        <option v-for="option in selectFields[keyName]" :value="option">{{ option }}</option>
      </select>
    </div>    <div v-else class="side">
      <input v-model="currentSetting" :type="typeof props.modelValue" />
    </div>
  </div>
</template>

<style scoped>
.settings-line {
  gap: 0.125rem;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-areas:
    "title side"
    "desc side";

  align-items: center;

  box-shadow: 0 0 .25rem #000A;
}

.settings-line .title {
  grid-area: title;
}

.settings-line .desc {
  grid-area: desc;
  font-size: 80%;
  opacity: 0.8;
}

.settings-line .side {
  grid-area: side;
}
</style>
