<script setup lang="ts">
import {useRouter} from "vue-router";
import AppBar from "@/components/AppBar.vue";
const router = useRouter()

</script>

<template>
  <div>
    <app-bar />
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>
<style scoped>
.hiddenMenu {
  position: fixed;
  top: 0;
  bottom: 100vh;
  left: 0;
  right: 0;

  overflow: hidden;

  background-color: var(--color-background);

  transition: bottom .25s;

  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 0.25rem;

  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;
}

.hiddenMenu.show {
  padding: 0.5rem 0;
  bottom: unset;
}

.hiddenMenu .button {
  padding: 0.75rem 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.25rem;
  background-color: var(--vt-c-dark-mute);

  cursor: pointer;
}

.hiddenMenu .button--name {
  font-weight: 600;
}
</style>
