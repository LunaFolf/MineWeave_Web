import {defineStore} from "pinia";
import {useLocalStorage} from "@vueuse/core";
import {
  getProject as apiGetProject,
  searchProjects as apiSearchProjects
} from "@/api/modrinth/projects";
import {useWebsocketStore} from "@/stores/websocket";

const websocketStore = useWebsocketStore();

export const useModrinthStore = defineStore("ModrinthStore", () => {
  const projects = useLocalStorage('modrinthProjects', [] as ModrinthProject[])

  async function getProjects(projectIDs: ModrinthProject["id"][]): Promise<ModrinthProject[]> {
    const theseProjects = []

    for (const id of projectIDs) {
      const project = projects.value.find(p => p.slug === id)
      if (project) {
        theseProjects.push(project)
      } else {
        const searchedProject = await apiGetProject(id)

        if (searchedProject) {
          theseProjects.push(searchedProject)
        }
      }
    }

    theseProjects.forEach(project => {
      if (!projects.value.find(p => p.id === project.id)) {
        projects.value.push(project)
      }
    })

    return theseProjects
  }

  async function getProject(projectID: ModrinthProject["id"]): Promise<ModrinthProject> {
    return (await getProjects([projectID]))[0]
  }

  async function searchProjects(query: string, type: 'plugins' | 'mods', page: number = 1): Promise<ModrinthSearchResult[]> {
    const minecraftVersion = websocketStore.serverConfig.minecraft_version
    const mcLoader = websocketStore.serverConfig.mod_loader

    const mainVersion = minecraftVersion.split('.').slice(0, 2).join('.')

    return await apiSearchProjects(query, page, type, [mcLoader], [minecraftVersion, mainVersion])
  }

  function getProjectType(project: ModrinthProject) {
    for (const loader of websocketStore.pluginLoaders) {
      if (project.loaders.includes(loader)) {
        return 'plugins'
      }
    }

    return 'mods'
  }

  return { projects, getProject, getProjects, searchProjects, getProjectType }
})
