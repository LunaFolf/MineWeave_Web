<script setup lang="ts">
import {useWebsocketStore} from "@/stores/websocket";
import Checkbox from "@/components/Checkbox.vue";
import RestartWarningBanner from "@/components/RestartWarningBanner.vue";
import ModrinthProject from "@/components/ModrinthProject.vue";

const websocketStore = useWebsocketStore();

const websocketHOST = import.meta.env.VITE_WS_HOST
const websocketPORT = import.meta.env.VITE_WS_PORT
let websocketURI
if (websocketHOST && websocketPORT) websocketURI = `http://${websocketHOST}:${websocketPORT}`

function downloadMods() {
  window.open(
    (websocketURI || window.location.host) + '/downloadMods',
    '_blank'
  )
}

</script>

<template>
  <div class="mods">

    <restart-warning-banner />

    <div class="modsRow modrinth">
      <button v-if="websocketStore.serverConfig.mods.modrinth.length" class="grey span-col" @click="downloadMods()">{{ $t('download.mods') }}</button>
      <modrinth-project
        v-for="projectID in websocketStore.serverConfig.mods.modrinth"
        :id="projectID"
      />
      <button class="grey span-col" @click="$router.push('modrinth')">{{ $t('more_content') }}</button>
    </div>

  </div>
</template>

<style scoped>
.mods {
  display: grid;
  gap: 1rem;
  padding: 1rem;

  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, max-content);

  height: var(--max-height);
  max-height: var(--max-height);

  overflow-y: scroll;
}

.modsRow {
  padding: 1rem;
  display: grid;
  gap: 0.5rem;

  background-color: var(--color-background-mute);

  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
}
</style>
