<script setup lang="ts">
import {useRoute} from "vue-router";
import {useWebsocketStore} from "@/stores/websocket";
import discordLogo from '../../assets/images/full_logo_blurple_RGB.svg'

const route = useRoute()
const websocketStore = useWebsocketStore();

if (route.query.code) {
  websocketStore.discordAuth(route.query.code)
}

function login () {
  window.open(
    `https://discord.com/oauth2/authorize?client_id=1225550027099996200&response_type=code&redirect_uri=${ window.location.origin }/discord&scope=identify`,
    '_self'
  )
}
</script>

<template>
  <div class="login">
    <img :src="discordLogo" alt="Discord Logo">

    <button class="green" @click="login">Login</button>
  </div>
</template>

<style scoped>
.login {
  display: grid;
  padding: 2rem;

  margin: auto;
  width: 50vw;
  height: 50vh;

  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 2rem;

  align-items: center;
  justify-content: center;

  vertical-align: center;
}
</style>
