<script setup lang="ts">
import {useWebsocketStore} from "@/stores/websocket";
import Checkbox from "@/components/Checkbox.vue";
import RestartWarningBanner from "@/components/RestartWarningBanner.vue";
import ModrinthProject from "@/components/ModrinthProject.vue";

const websocketStore = useWebsocketStore();
const plugins = websocketStore.serverConfig.plugins

const baseEssentialsXPlugins: AvailableEssentialsXAssets[] = [
  'EssentialsX',
  'EssentialsXAntiBuild',
  'EssentialsXChat',
  'EssentialsXDiscord',
  'EssentialsXDiscordLink',
  'EssentialsXGeoIP',
  'EssentialsXProtect',
  'EssentialsXSpawn',
  'EssentialsXXMPP'
]

const spigotPlugins = plugins.spigot

</script>

<template>
  <div class="plugins">

    <restart-warning-banner />

    <div class="pluginsRow essentials">
      <h2>Essentials X</h2>
      <div>
        <checkbox
          v-for="plugin in baseEssentialsXPlugins"
          v-model="websocketStore.serverConfig.plugins.essentials_x"
          :disabled="!websocketStore.serverConfig.plugins.essentials_x.includes('EssentialsX') && plugin !== 'EssentialsX'"
          :val="plugin"
          :label="plugin"
          type="checkbox"
        />
      </div>
      <button class="green span-col" @click="websocketStore.saveConfig()">Save</button>
    </div>

    <div class="pluginsRow modrinth">
      <modrinth-project
        v-for="projectID in websocketStore.serverConfig.plugins.modrinth"
        :id="projectID"
      />
      <button class="grey span-col" @click="$router.push('modrinth')">{{ $t('more_content') }}</button>
    </div>

    <div class="pluginsRow spigot">
      {{ spigotPlugins }}
    </div>

  </div>
</template>

<style scoped>
.plugins {
  display: grid;
  gap: 1rem;
  padding: 1rem;

  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, max-content);

  height: var(--max-height);
  max-height: var(--max-height);

  overflow-y: scroll;
}

.pluginsRow {
  padding: 1rem;
  display: grid;
  gap: 0.5rem;

  background-color: var(--color-background-mute);
}

.pluginsRow.modrinth {
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
}
</style>
