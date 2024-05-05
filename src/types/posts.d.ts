type Post = {
  id: number
  description: string | null
  tags: Tags
  sources: string[]
  files: PostFile[]
  hasSound: boolean
  isVideo: boolean
  isGif: boolean
  rating: 'safe' | 'questionable' | 'explicit'
  requiresLogin: boolean,
  pools: number[],
  previewImage: () => PostFile,
  highestResFile: () => PostFile
}

type TagKeys = 'artist' | 'character' | 'copyright' | 'general' | 'meta' | 'species'

type Tags = {
  [key in TagKeys]: string[]
}

type PostFile = {
  ext: string | null
  height: number
  width: number
  megapixels: number
  md5: string | null
  size: number | null
  url: string
}

type Pool = {
  id: number,
  name: string,
  description: string | null,
  is_active: boolean,
  category: 'series' | 'collection',
  post_ids: Post.id[],
  posts: Post[],
  creator_id: number,
  creator_name: string,
  post_count: number
}

type PostSet = {
  id: number,
  creator_id: number,
  is_public: boolean,
  name: string,
  shortname: string,
  description: string,
  post_count: number,
  transfer_on_delete: boolean,
  post_ids: Post.id[],
  posts: Post[]
}

type poolSearchParams = {
  'search[name_matches]'?: string,
  'search[id]'?: number,
  'search[description_matches]'?: string,
  'search[creator_name]'?: string,
  'search[is_active]'?: boolean,
  'search[category]'?: 'series' | 'collection',
  'search[order]'?: 'name' | 'created_at' | 'updated_at' | 'post_count',
  limit: number,
  page: number
}

type setSearchParams = {
  'search[name]'?: string,
  'search[shortname]'?: string,
  'search[creator_name]'?: string,
  'search[order]'?: 'name' | 'created_at' | 'updated_at' | 'post_count',
  limit: number,
  page: number
}
