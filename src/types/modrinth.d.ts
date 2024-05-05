interface ModrinthProject {
  slug: string,
  title: string,
  description: string,
  categories: string[],
  client_side: 'required' | 'optional' |'unsupported',
  server_side: 'required' | 'optional' |'unsupported',
  body: string,
  status: 'approved' | 'archived' | 'rejected' | 'draft' | 'unlisted' | 'processing' | 'withheld' | 'scheduled' | 'private' | 'unknown',
  requested_status?: 'approved' | 'archived' | 'unlisted' | 'private' | 'draft' | null,
  additional_categories?: string[],
  issues_url?: string | null,
  source_url?: string | null,
  wiki_url?: string | null,
  discord_url?: string | null,
  donation_urls?: {
    id: string,
    platform: string,
    url: string
  }[],
  project_type: 'mod' |'modpack' | 'resourcepack' | 'shader',
  downloads: number,
  icon_url?: string | null,
  color?: number | null,
  thread_id?: string,
  monetization_status?: 'monetized' | 'demonetized' | 'force-demonetized',
  id: string,
  team: string,
  body_url?: string | null,
  moderator_message?: {
    message: string,
    body: string | null
  } | null,
  published: string,
  updated: string,
  approved?: string | null,
  queued?: string | null,
  followers: number,
  license: {
    id: string,
    name: string,
    url: string | null
  },
  versions: string[],
  game_versions: string[],
  loaders: string[],
  gallery: {
    url: string,
    featured: boolean,
    title?: string | null,
    description?: string | null,
    created: string,
    ordering?: number
  }[] | null
}

interface ModrinthSearchResult {
  slug: string,
  title: string,
  description: string,
  categories?: string[],
  client_side: 'required' | 'optional' |'unsupported',
  server_side: 'required' | 'optional' |'unsupported',
  project_type: 'mod' |'modpack' | 'resourcepack' | 'shader',
  downloads: number,
  icon_url?: string | null,
  color?: number | null,
  thread_id?: string,
  monetization_status?: 'monetized' | 'demonetized' | 'force-demonetized',
  project_id: string,
  author: string,
  display_categories?: string[],
  versions: string[],
  follows: number,
  date_created: string,
  date_modified: string,
  latest_version?: string,
  license: string,
  gallery?: string[],
  featured_gallery?: string | null
}

type ModrinthFile = {
  hashes: {
    sha512: string,
    sha1: string
  },
  url: string,
  filename: string,
  primary: boolean,
  size: number,
  file_type: string | null
}

type ModrinthVersionDependency = {
  version_id: string | null,
  project_id: string | null,
  file_name: string | null,
  dependency_type: "required" | "optional" | "incompatible" | "embedded"
}

type ModrinthPluginType = "mod" | "plugin" | "datapack" | "shader" | "resourcepack" | "modpack"

// interface ModrinthPluginVersionV3 {
//   id: string,
//   project_id: string,
//   author_id: string,
//   featured: boolean,
//   name: string,
//   version_number: string,
//   project_types: [ ModrinthPluginType ],
//   games: [ "minecraft-java" ],
//   changelog: string,
//   date_published: string,
//   downloads: number,
//   version_type: "release" | "beta" | "alpha",
//   status: "listed" | "archived" | "draft" | "unlisted" | "scheduled" | "unknown",
//   requested_status: "listed" | "archived" | "draft" | "unlisted" | null,
//   files: ModrinthFile[],
//   dependencies: ModrinthVersionDependency[],
//   loaders: serverConfig["mod_loader"][],
//   ordering: null,
//   game_versions: serverConfig["minecraft_version"][]
// }

interface ModrinthProjectVersion {
  name: string,
  version_number: string,
  changelog: string | null,
  dependencies: ModrinthVersionDependency[],
  game_versions: serverConfig["minecraft_version"][],
  version_type: "release" | "beta" | "alpha",
  loaders: serverConfig["mod_loader"][],
  featured: boolean,
  status: "listed" | "archived" | "draft" | "unlisted" | "scheduled" | "unknown",
  requested_status: "listed" | "archived" | "draft" | "unlisted" | null,
  id: string,
  project_id: string,
  author_id: string,
  date_published: string,
  downloads: number,
  changelog_url: string | null,
  files: ModrinthFile[]
}
