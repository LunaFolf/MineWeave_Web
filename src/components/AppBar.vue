<script setup lang="ts">
import {useWebsocketStore} from "@/stores/websocket";
import icon from '../assets/icon/transparent.png'
import {computed, ref} from "vue";

const routes = computed(() => {
  return [
    {
      name: 'dashboard',
      show: true,
    },
    {
      name: 'settings',
      show: true,
    },
    {
      name: 'plugins',
      show: websocketStore.isPluginsSupported,
    },
    {
      name: 'mods',
      show: websocketStore.isModsSupported,
    }
  ]
})

const websocketStore = useWebsocketStore();

</script>

<template>
  <div class="appbar">
    <img :src="icon" class="clickable"  alt="MineWeave Icon" @click="$router.push('dashboard')"/>
    <div>
      <span class="clickable" @click="$router.push('dashboard')">
        {{ $t('app.title') }}
      </span>
    </div>
    <div class="routes">
      <template v-for="route in routes">
        <router-link
          :to="route.name"
          v-if="route.show"
        >
          {{ $t('app.routes.' + route.name) }}
        </router-link>
      </template>
    </div>
  </div>
</template>

<style scoped>
.appbar {
  display: grid;
  gap: 1rem;
  padding: .5rem 1rem;

  align-items: center;
  justify-content: center;

  grid-template-columns: auto 1fr auto;
  grid-template-rows: 100%;

  background-color: var(--color-background-soft);
  height: 56px;
  max-height: 56px;
}

.appbar img {
  height: 100%;
}

.routes {
  display: grid;
  gap: 0.5rem;

  grid-auto-flow: column;
}
</style>
