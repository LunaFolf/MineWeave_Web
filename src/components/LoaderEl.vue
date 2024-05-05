<script setup lang="ts">
const props = defineProps(['loading'])
</script>

<template>
  <div v-if="props.loading" class="loader">LOADING</div>
</template>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: radial-gradient(var(--vt-c-dark-mute-alpha), var(--vt-c-dark));

  display: grid;
  align-items: center;
  justify-items: center;

  font-weight: bolder;
}
</style>
