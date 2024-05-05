<script setup lang="ts">
import {computed, ref} from "vue";
import {useWebsocketStore} from "@/stores/websocket";

const commandInput = ref("");
const webSocketStore = useWebsocketStore()

const buttons = computed(() => {
  const activeButtons = []

  if (['online'].includes(webSocketStore.serverState)) {
    activeButtons.push('stop', 'restart')
  } else if (['offline'].includes(webSocketStore.serverState)) {
    activeButtons.push('start')
  } else if (webSocketStore.serverState !== 'shutdown') {
    activeButtons.push('force_stop')
  }

  return activeButtons
})

function getStyleForAction (actionName) {
  switch (actionName) {
    case 'start':
      return {
        icon: ['fad', 'play'],
        color: 'green'
      }
    case 'restart':
      return {
        icon: ['fad', 'arrows-rotate-reverse'],
        color: 'orange'
      }
    case 'stop':
      return {
        icon: ['fad', 'power-off'],
        color: 'red'
      }
    case 'force_stop':
      return {
        icon: ['fad', 'skull'],
        color: 'red'
      }
    default:
      return {
        icon: ['fad', 'question'],
        color: ''
      }
  }
}


function submitCommand(): void {
  if (!commandInput.value) return

  webSocketStore.postCommand(commandInput.value)

  commandInput.value = "";
}

function submitAction(actionName: string): void {
  if (!actionName) return

  webSocketStore.postAction(actionName)
}

</script>

<template>
  <div class="quickBar" :class="'items-' + buttons.length">
    <input
      v-model="commandInput"
      @keyup.enter="submitCommand"
      placeholder="command goes here..."
      :disabled="webSocketStore.serverState !== 'online'"
    />

    <button
      v-for="actionName in buttons"
      @click="submitAction(actionName)"
      :title="actionName"
      :class="getStyleForAction(actionName).color"
    >
      <font-awesome-icon :icon="getStyleForAction(actionName).icon" size="xl" />
    </button>
  </div>
</template>

<style scoped>
.quickBar {
  display: grid;
  width: 100%;
  gap: 0.5rem;

  grid-template-columns: 1fr;
}

.quickBar.items-1 {
  grid-template-columns: 1fr repeat(1, max-content);
}
.quickBar.items-2 {
  grid-template-columns: 1fr repeat(2, max-content);
}
.quickBar.items-3 {
  grid-template-columns: 1fr repeat(3, max-content);
}
.quickBar.items-4 {
  grid-template-columns: 1fr repeat(4, max-content);
}
</style>
