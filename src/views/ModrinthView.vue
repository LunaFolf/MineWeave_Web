<script setup lang="ts">
import {useDebounceFn} from "@vueuse/core";
import {computed, ref, watch} from "vue";
import {useModrinthStore} from "@/stores/modrinth";
import ModrinthProject from "@/components/ModrinthProject.vue";
import PageButtons from "@/components/PageButtons.vue";
import {useRoute} from "vue-router";

const modrinthStore = useModrinthStore()

const _searchFilter = ref('')

const page = ref(1)

const route = useRoute()

async function search(page = 1) {
  projects.value = []
  projects.value = await modrinthStore.searchProjects(_searchFilter.value, route.query.type || 'plugins', page)
}

const searchFilter = computed({
  get () {
    return _searchFilter.value
  },
  set: useDebounceFn((value) => {
    _searchFilter.value = value
  }, 1000)
})

const projects = ref([] as ModrinthSearchResult[])

watch(_searchFilter, async (value) => search())
watch(page, async (value) => search(value))

search()

</script>

<template>
  <div class="modrinth">
    <input v-model="searchFilter" type="search" placeholder="Search" />
    <page-buttons v-model="page" />
    <div class="list">
      <modrinth-project
        v-for="project in projects"
        :id="project.slug"
      />
    </div>
    <page-buttons v-model="page" />
  </div>
</template>

<style scoped>
.modrinth {
  display: grid;
  gap: 1rem;
  padding: 1rem;

  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, max-content);

  height: var(--max-height);
  max-height: var(--max-height);

  overflow-y: scroll;
}

.list {
  display: grid;
  gap: 1rem;

  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
}
</style>
