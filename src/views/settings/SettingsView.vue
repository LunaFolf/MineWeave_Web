<script setup lang="ts">
import SettingsPanel from "@/components/SettingsPanel.vue";
import {useWebsocketStore} from "@/stores/websocket";

const websocketStore = useWebsocketStore();
</script>

<template>
  <div class="settings">
    <button class="green" @click="websocketStore.saveConfig()">Save</button>
    <settings-panel />
    <button class="green" @click="websocketStore.saveConfig()">Save</button>
  </div>
</template>

<style scoped>
.settings {
  display: grid;
  gap: 1rem;
  padding: 1rem;

  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;

  height: var(--max-height);
  max-height: var(--max-height);

  overflow-y: scroll;
}
</style>
