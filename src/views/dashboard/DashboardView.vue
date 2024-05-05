<script setup lang="ts">
import {useWebsocketStore} from "@/stores/websocket";
import QuickActionBar from "@/components/QuickActionBar.vue";
import SettingsPanel from "@/components/SettingsPanel.vue";
import RestartWarningBanner from "@/components/RestartWarningBanner.vue";

const webSocketStore = useWebsocketStore()
</script>

<template>
  <div class="dashboard">
    <restart-warning-banner />

    <quick-action-bar />

    <div class="consoleView">
      <div
        class="consoleViewLine"
        v-for="(historyItem, index) in webSocketStore.history.sort((a, b) => b.timestamp - a.timestamp)"
        :key="`${index}-${historyItem.timestamp}-${historyItem.content.substring(0, -10)}`"
      >
        {{ historyItem.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: grid;
  gap: 1rem;
  padding: 1rem;

  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content 1fr;

  height: var(--max-height);
  max-height: var(--max-height);
}

.consoleView {
  display: grid;
  background-color: var(--color-background-mute);
  font-size: 1rem;
  line-height: 1rem;

  font-family: consolas, monospace;

  grid-auto-rows: max-content;
  grid-template-columns: 100%;

  height: 100%;

  overflow-x: hidden;
  overflow-y: scroll;
}

.consoleViewLine {
  overflow-wrap: break-word;
  padding: 0.5rem;
}

.consoleViewLine:nth-child(odd) {
  background-color: #0002;
}
</style>
