<script setup lang="ts">
import {useModrinthStore} from "@/stores/modrinth";
import {useWebsocketStore} from "@/stores/websocket";
import {computed} from "vue";

const props = defineProps<{
  id: ModrinthProject["id"]
}>()

const modrinthStore = useModrinthStore()
const websocketStore = useWebsocketStore()

const project = await modrinthStore.getProject(props.id)
const type = modrinthStore.getProjectType(project)

const installed = computed(() => {
  return websocketStore.serverConfig[type].modrinth.includes(props.id)
})

function addProject () {
  websocketStore.serverConfig[type].modrinth.push(props.id)

  websocketStore.saveConfig()
}

function removeProject () {
  const index = websocketStore.serverConfig[type].modrinth.indexOf(props.id)
  if (index > -1) {
    websocketStore.serverConfig[type].modrinth = websocketStore.serverConfig[type].modrinth.toSpliced(index, 1)

    websocketStore.saveConfig()
  }
}
</script>

<template>
  <div class="modrinth_project">
    <div class="icon">
      <img :src="project.icon_url"  alt="project icon"/>
    </div>
    <div class="title">
      <a :href="`https://modrinth.com/plugin/${project.slug || project.id}`" target="_blank">
        {{ project.title }}
      </a>
    </div>
    <div class="body">
      {{ project.description }}
    </div>
    <div class="actions">
      <button v-if="installed" class="red" @click="removeProject()">
        {{ $t(`project.remove.${type}`) }}
      </button>
      <button v-else class="green" @click="addProject()">
        {{ $t(`project.add.${type}`) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.modrinth_project {
  display: grid;
  gap: 1rem;
  padding: 1rem;

  grid-template-columns: 20% 1fr;

  align-items: center;

  grid-template-areas:
    "icon title"
    "icon body"
    "actions actions";

  background-color: #0002;
}

.icon {
  grid-area: icon;
  background-color: #FFF1;
  padding: .5rem;
}

.icon img {
  width: 100%;
}

.title {
  font-size: 1.5rem;
  line-height: 1.5rem;

  grid-area: title;
}

.body {
  grid-area: body;
}

.actions {
  grid-area: actions;
}
</style>
