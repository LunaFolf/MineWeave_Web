import {get} from '@/api/http'

export async function getProject(projectID: ModrinthProject["id"]) {
  return await get('https://api.modrinth.com/v2/project/' + projectID)
}

export async function searchProjects(query: string, offset: number = 1, type: 'plugins' | 'mods', categories?: string[], gameVersions?: string[]) {
  let facets = '["' + (type === 'plugins' ? 'server_side:required' : 'client_side:required') + '"],'

  const limit = 20

  facets += `[${categories.map(c => `"categories:${c}"`).join(',')}]`

  facets += `,[${gameVersions.map(v => `"versions:${v}"`).join(',')}]`

  const data = await get(`https://api.modrinth.com/v2/search`, {
    query,
    limit,
    facets: `[${facets}]`,
    offset: (offset - 1) * limit
  })

  return data.hits
}
