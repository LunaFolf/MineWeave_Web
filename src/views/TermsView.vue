<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authentication'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthenticationStore()
const route = useRoute()
const router = useRouter()

function declineAgreement() {
  window.close()
}

function agreeAgreement() {
  authStore.agreeToTerms(true)

  const returnPath = route.query.returnTo

  router.push(returnPath || { name: 'dashboard' })
}
</script>

<template>
  <main>
    <div class="container">
      <div class="title">W A R N I N G</div>
      <div class="body">
        <p>
          This feature is in TESTING, and could fuck up any time.
        </p>
        <p>
          Also, I have ZERO clue if this is secure... I was tired as shit when I coded all this.
        </p>
        <p>
          So... yeah, you have been warned... now go nuts.
        </p>
      </div>
      <div class="actions">
        <button @click="agreeAgreement">I am aware of the dangers</button>
        <button @click="declineAgreement">I'm a lil pussy boi</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: var(--max-height);
  max-height: var(--max-height);

  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 50vw;

  justify-content: center;
  align-items: center;
}

.title {
  text-align: center;
  font-size: 3rem;
  line-height: 3.5rem;

  font-weight: bold;
}

.body,
.actions {
  display: grid;
  font-size: 1rem;
  line-height: 1.5rem;

  font-family: sans-serif;

  gap: 0.5rem;
}

@media only screen and (max-width: 520px) {
  main {
    grid-template-columns: 90vw
  }
}
</style>
