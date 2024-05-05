<script setup lang="ts">
import {useWebsocketStore} from "@/stores/websocket";

const websocketStore = useWebsocketStore();
</script>

<template>
  <div v-if="websocketStore.hasConfigChanged" class="banner">
    <div class="title">
      <h2>
        {{ $t('warning.config_change.title') }}
      </h2>
      <p>
        {{ $t('warning.config_change.body') }}
      </p>
    </div>
  </div>
  <div v-else>

  </div>
</template>

<style scoped>
.banner {
  display: grid;
  width: 100%;

  align-items: center;

  background-color: #ffb72c;

  padding: 1rem;

  color: #000C;
}
</style>
