<script setup lang="ts">
import {useWebsocketStore} from "@/stores/websocket";
import Setting from "@/components/Setting.vue";
import {computed, ref} from "vue";

const webSocketStore = useWebsocketStore()

const gameSettingsFilter = ref('')

const gameSettingKeys = computed(() => {
  const keys = Object.keys(webSocketStore.serverConfig?.game_settings || [])
  if (!keys || !gameSettingsFilter.value) return keys

  return keys.filter(key => key.includes(gameSettingsFilter.value))
})

const keySettings = ['mod_loader', 'minecraft_version']
</script>

<template>
  <div class="settings-panel">
    <div class="launcher-settings">
      <setting
        v-for="setting in keySettings"
        :title="$t(`launcher_settings.${setting}.title`)"
        :description="$t(`launcher_settings.${setting}.desc`)"
        v-model="webSocketStore.serverConfig[setting]"
        :key-name="setting"
      />

      <setting
        v-for="setting in Object.keys(webSocketStore.serverConfig?.launcher_settings || [])"
        :title="$t(`launcher_settings.${setting}.title`)"
        :description="$t(`launcher_settings.${setting}.desc`)"
        v-model="webSocketStore.serverConfig.launcher_settings[setting]"
        :key-name="setting"
      />

    </div>
    <div class="game-settings">
      <input class="span" v-model="gameSettingsFilter" placeholder="Game Settings Search" />

      <setting
        v-for="setting in gameSettingKeys"
        :title="$t(`game_settings.${setting}.title`)"
        :description="$t(`game_settings.${setting}.desc`)"
        v-model="webSocketStore.serverConfig.game_settings[setting]"
        :key-name="setting"
      />

    </div>
  </div>
</template>

<style scoped>
.settings-panel {
  display: grid;
  gap: 0.5rem;
  grid-template-rows: max-content max-content;
}

.launcher-settings, .game-settings {
  display: grid;
  padding: .5rem;
  gap: 0.5rem;
  background-color: var(--color-background-mute);
}

.game-settings {
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
}

.game-settings .span {
  grid-column: 1 / -1;
}

</style>
