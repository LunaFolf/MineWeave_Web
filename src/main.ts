import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createI18n } from 'vue-i18n'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/pro-solid-svg-icons'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { fat } from '@fortawesome/pro-thin-svg-icons'
import { fad } from '@fortawesome/pro-duotone-svg-icons'
import { fass } from '@fortawesome/sharp-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import router from './router'

// TODO: Move these translations, into their own file.
const i18n = createI18n({
  legacy: false,
  messages: {
    en: {
      download: {
        mods: 'Download Mods'
      },
      more_content: 'Search for more content...',
      project: {
        add: {
          mods: 'Add as mod',
          plugins: 'Add as plugin'
        },
        remove: {
          mods: 'Remove mod',
          plugins: 'Remove plugin'
        }
      },
      warning: {
        config_change: {
          title: 'Config change detected',
          body: 'A server restart will be needed, for recent changes to take effect.'
        }
      },
      app: {
        title: 'MineWeave',
        routes: {
          dashboard: 'Dashboard',
          settings: 'Settings',
          plugins: 'Plugins',
          mods: 'Mods'
        }
      },
      launcher_settings: {
        mod_loader: {
          title: 'Minecraft Loader',
          desc: 'Which Mod/Plugin Loader to use.'
        },
        minecraft_version: {
          title: 'Minecraft Version',
          desc: 'Which Minecraft Version to use.'
        },
        auto_start: {
          title: 'Auto Start',
          desc: 'Should the MC Server start when the launcher boots?'
        },
        auto_restart: {
          title: 'Auto Restart',
          desc: 'If the MC Server stops, should it auto restart?'
        },
        check_for_updates: {
          title: 'Check for Updates',
          desc: 'How often should the launcher check for updates, in minutes?'
        },
      },
      game_settings: {
        allow_flight: {
          title: 'Allow Flight',
          desc: 'Allow players to use flight while in Survival mode.'
        },
        allow_nether: {
          title: 'Allow Nether',
          desc: 'Allow players to travel to the Nether.'
        },
        broadcast_console_to_ops: {
          title: 'Broadcast commands to OPs',
          desc: 'Send console command outputs, to online operators.'
        },
        broadcast_rcon_to_ops: {
          title: 'Broadcast RCON commands to OPs',
          desc: 'Send RCON command outputs, to online operators.'
        },
        debug: {
          title: 'Debug',
          desc: 'Unknown...'
        },
        difficulty: {
          title: 'Difficulty',
          desc: 'Defines the game difficulty (damage dealt by mobs, hunger, poison affects)'
        },
        enable_command_block: {
          title: 'Enable command blocks',
          desc: ''
        },
        enable_jmx_monitoring: {
          title: 'Enable JMX Monitoring',
          desc: ''
        },
        enable_query: {
          title: 'Enable Query',
          desc: 'Enables GameSpy4 protocol server listener. Used to get information about server.'
        },
        enable_rcon: {
          title: 'Enable RCON',
          desc: 'Enables remote access to the server console.'
        },
        enable_status: {
          title: 'Enable Status',
          desc: 'Makes the server appear as "online" on the server list.'
        },
        enforce_secure_profile: {
          title: 'Enforce Secure Profile',
          desc: 'If set to true, players without a Mojang-signed public key will not be able to connect.'
        },
        enforce_whitelist: {
          title: 'Enforce Whitelist',
          desc: ''
        },
        entity_broadcast_range_percentage: {
          title: 'Entity broadcast range %',
          desc: 'How close entities need to be, before being sent to clients.'
        },
        force_gamemode: {
          title: 'Force Gamemode',
          desc: 'Force players to join in the default gamemode.'
        },
        function_permission_level: {
          title: 'Function permission Level',
          desc: 'The default permission level for functions.'
        },
        gamemode: {
          title: 'Gamemode',
          desc: 'Defines the mode of gameplay.'
        },
        generate_structures: {
          title: 'Generate Structures',
          desc: 'Defines whether to generate structures, such as villages.'
        },
        generator_settings: {
          title: 'Generator Settings',
          desc: 'The settings used to customize world generation.'
        },
        hardcore: {
          title: 'Hardcore',
          desc: 'Difficulty is forced to hard, and players are set to spectator mode on death.'
        },
        hide_online_players: {
          title: 'Hide online players',
          desc: 'If true, a player list is not sent on status requests.'
        },
        initial_disabled_packs: {
          title: 'Initial disabled packs',
          desc: 'List of datapacks to not be auto-enabled on world creation.'
        },
        initial_enabled_packs: {
          title: 'Initial enabled packs',
          desc: 'List of datapacks to be enabled on world creation.'
        },
        level_name: {
          title: 'Level Name',
          desc: ''
        },
        level_seed: {
          title: 'Level Seed',
          desc: 'Seed for world generation. Random if left blank.'
        },
        level_type: {
          title: 'Level Type',
          desc: 'Determines the world preset for generation.'
        },
        log_ips: {
          title: 'Log IPs',
          desc: ''
        },
        max_chained_neighbor_updates: {
          title: 'Max chained neighbor updates',
          desc: 'Limit the amount of consecutive neighbor updates before skipping additional ones. Negative values remove the limit.'
        },
        max_players: {
          title: 'Max Players',
          desc: ''
        },
        max_tick_time: {
          title: 'Max tick time',
          desc: 'Max milliseconds a single tick may take, before the server forcibly shuts-down.'
        },
        max_world_size: {
          title: 'Max world size',
          desc: ''
        },
        motd: {
          title: 'MOTD',
          desc: 'Message of the day, displayed in the server list below the name.'
        },
        network_compression_threshold: {
          title: 'Network compression Threshold',
          desc: ''
        },
        online_mode: {
          title: 'Online mode',
          desc: 'Check connecting players against the Minecraft account database.'
        },
        op_permission_level: {
          title: 'OP Level',
          desc: 'Default permission level for ops'
        },
        player_idle_timeout: {
          title: 'Player AFK Timeout',
          desc: 'Players are kicked after that many minutes'
        },
        prevent_proxy_connections: {
          title: 'Prevent proxy connections',
          desc: 'If the ISP/AS sent from the server is different from the one from Mojang\'s auth servers, the player is kicked.'
        },
        pvp: {
          title: 'PVP',
          desc: ''
        },
        query_port: {
          title: 'Query Port',
          desc: 'Sets the port for the query server (see Enable Query)'
        },
        rate_limit: {
          title: 'Rate Limit',
          desc: 'Max amount of packets a user can send, before getting kicked.'
        },
        rcon_password: {
          title: 'RCON Password',
          desc: 'TODO: Move this'
        },
        rcon_port: {
          title: 'RCON Port',
          desc: 'Sets the RCON network port.'
        },
        require_resource_pack: {
          title: 'Require resource pack',
          desc: 'If true, players will be disconnected if they decline the resource pack.'
        },
        resource_pack: {
          title: 'Resource Pack',
          desc: 'Optional URI to a resource pack.'
        },
        resource_pack_id: {
          title: 'Resource Pack ID',
          desc: '?'
        },
        resource_pack_prompt: {
          title: 'Resource Pack Prompt',
          desc: 'Optional custom message to be shown on resource pack prompt.'
        },
        resource_pack_sha1: {
          title: 'Resource Pack SHA-1',
          desc: 'Optional SHA-1 digest of the resource pack, in lowercase hexadecimal.'
        },
        server_ip: {
          title: 'server ip',
          desc: 'TODO: remove from settings'
        },
        server_port: {
          title: 'server port',
          desc: 'TODO: remove from settings'
        },
        simulation_distance: {
          title: 'Simulation Distance',
          desc: 'Sets the maximum distance from players that living entities may be rendered/ticked.'
        },
        spawn_animals: {
          title: 'Spawn Animals',
          desc: 'Can animals be spawned?'
        },
        spawn_monsters: {
          title: 'Spawn Monsters',
          desc: 'Can monsters be spawned?'
        },
        spawn_npcs: {
          title: 'Spawn NPC',
          desc: 'Can NPCs (villagers) be spawned?'
        },
        spawn_protection: {
          title: 'Spawn protection',
          desc: 'Determines the side length of the square spawn protection area as 2x+1.'
        },
        sync_chunk_writes: {
          title: 'Sync chunk writes',
          desc: 'Enables synchronous chunk writes'
        },
        text_filtering_config: {
          title: 'Text filtering config',
          desc: '?'
        },
        use_native_transport: {
          title: 'Use native transport',
          desc: 'Linux server performance improvements.'
        },
        view_distance: {
          title: 'View Distance',
          desc: 'Sets the amount of world data the server sends the client, measured in chunks.'
        },
        white_list: {
          title: 'Enable Whitelist',
          desc: ''
        }
      }
    }
  }
})

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(router)

library.add(fas, far, fal, fat, fad, fass)

app
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('font-awesome-layers', FontAwesomeLayers)
  .mount('#app')

console.log('\x1b[31m\x1b[4m%s\x1b[0m', '🔧 ✅ Last built: 📅 ' + import.meta.env.VITE_LASTBUILD + ' ⏰ ❗🔧');
