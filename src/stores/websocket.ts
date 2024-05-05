import { defineStore } from 'pinia'
import {useLocalStorage} from "@vueuse/core";
import {computed, ref} from "vue";
import {type Router, useRouter} from "vue-router";

let wss

type ServerState = 'offline' | 'restarting' | 'booting' | 'online' | 'updating'

let router: Router

const websocketHOST = import.meta.env.VITE_WS_HOST
const websocketPORT = import.meta.env.VITE_WS_PORT
let websocketURI
if (websocketHOST && websocketPORT) websocketURI = `ws://${websocketHOST}:${websocketPORT}`

export const useWebsocketStore = defineStore('websocket', () => {
  if (!router) router = useRouter()

  const history = ref([])
  const serverConfig = ref({} as ServerConfig)
  const serverState = ref('' as ServerState)
  const hasConfigChanged = ref(false)

  const pluginLoaders: PluginLoader = ['bukkit', 'folia', 'paper', 'purpur', 'spigot']
  const modLoaders: ModLoader = ['fabric', 'forge', 'liteloader', 'modloader', 'neoforge', 'rift', 'quilt']

  const discordAuthToken = useLocalStorage('discordAuthToken', '')
  const discordExpiry = useLocalStorage('discordExpiry', 0)
  const discordUser = useLocalStorage('discordUser', {})

  const isPluginsSupported = computed(() => {
    return pluginLoaders.includes(serverConfig.value.mod_loader)
  })

  const isModsSupported = computed(() => {
    return modLoaders.includes(serverConfig.value.mod_loader)
  })

  const isAuthed = computed(() => {
    return (discordAuthToken.value.length > 0) && new Date().getTime() <= discordExpiry.value
  })

  async function connectToSocket() {
    try {
      const connectTo = (websocketURI || ('ws://' + window.location.host))
      console.log(connectTo)
      wss = new WebSocket(connectTo)
    } catch (err) {
      console.error(err)
      connectToSocket()
    }

    wss.onopen = event => {
      requestEverything()
    }

    wss.onmessage = event => {
      const { type, data } = JSON.parse(event.data)

      console.log('incoming message', { type, data })

      if (type === 'updateHistory') {
        history.value = data
      }

      if (type === 'serverConfig') {
        serverConfig.value = data
      }

      if (type === 'serverState') {
        serverState.value = data
      }

      if (type === 'hasConfigChanged') {
        hasConfigChanged.value = data
      }

      if (type === 'updateAuth') {
        discordAuthToken.value = data.auth_token
        discordExpiry.value = data.expiry
        discordUser.value = data.user

        router.push('dashboard')
      }
      if (type === 'deAuth') {
        discordAuthToken.value = ''
        discordExpiry.value = 0
        discordUser.value = {}
      }
    }

    wss.onclose = () => {
      setTimeout(() => {
        connectToSocket()
      }, 1000)
    }
  }

  function requestEverything() {
    wss.send(JSON.stringify({
      type: 'requestEverything',
      token: discordAuthToken.value
    }))
  }

  function postCommand(command: string) {
    wss.send(JSON.stringify({
      type: 'command',
      content: command,
      token: discordAuthToken.value
    }))
  }

  function postAction(actionName: string) {
    wss.send(JSON.stringify({
      type: 'action',
      content: actionName,
      token: discordAuthToken.value
    }))
  }

  function saveConfig() {
    wss.send(JSON.stringify({
      type: 'saveConfig',
      content: serverConfig.value,
      token: discordAuthToken.value
    }))
  }

  function discordAuth(code: string) {
   wss.send(JSON.stringify({
     type: 'discordAuth',
     content: code,
     token: discordAuthToken.value
   }))
  }

  connectToSocket()

  return { hasConfigChanged, history, serverState, serverConfig, discordAuthToken, discordExpiry, discordUser, pluginLoaders, modLoaders, isModsSupported, isPluginsSupported, isAuthed, postCommand, postAction, saveConfig, discordAuth }
})
