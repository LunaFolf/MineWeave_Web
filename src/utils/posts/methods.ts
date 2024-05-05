export const mapToPostFile = (postFileObject: { [key: string]: any }): PostFile | undefined => {
  if (!postFileObject || !postFileObject.url) return undefined
  return {
    url: postFileObject.url,
    width: parseInt(postFileObject.width),
    height: parseInt(postFileObject.height),
    ext: postFileObject.ext || postFileObject.url.split('.').pop(),
    md5: postFileObject.md5 || null,
    size: parseInt(postFileObject.size) || null,
    megapixels: (parseInt(postFileObject.width) * parseInt(postFileObject.height)) / 1000000
  }
}

const fallbackPostFile = (text?: string): PostFile => ({
  url: `https://via.placeholder.com/500?text=${text || 'No image found'}`,
  width: 500,
  height: 500,
  ext: 'webp',
  md5: null,
  size: null,
  megapixels: 0.25
})

export const mapToTags = (tagsObject: { [key in TagKeys]: string[] }): Tags => {
  return {
    artist: tagsObject.artist,
    character: tagsObject.character,
    copyright: tagsObject.copyright,
    general: tagsObject.general,
    meta: tagsObject.meta,
    species: tagsObject.species
  }
}

type AltObj = {
  urls: string[]
  width: number
  height: number
  type?: string
}

type Alts = {
  [quality: string]: AltObj
}
const extractFilesFromAlternates = (alternates: Alts): PostFile[] => {
  const altKeys = Object.keys(alternates)
  const files: PostFile[] = []

  altKeys.forEach((key: string) => {
    const alt = alternates[key]

    alt.urls.forEach((url: string) => {
      if (!url) return

      const file = mapToPostFile({
        url,
        width: alt.width,
        height: alt.height,
        ext: url.split('.').pop()
      })

      if (file) files.push(file)
    })
  })

  return files
}

export const mapToPost = (postObject: { [key: string]: any }): Post => {
  let files: PostFile[] = []

  let requiresLogin = false

  const filesFromFile = mapToPostFile(postObject.file)
  const filesFromSample = mapToPostFile(postObject.sample)
  const filesFromPreview = mapToPostFile(postObject.preview)
  const filesFromAlternates = extractFilesFromAlternates(postObject.sample.alternates)

  if (filesFromFile) files.push(filesFromFile)
  if (filesFromSample) files.push(filesFromSample)
  if (filesFromPreview) files.push(filesFromPreview)
  if (filesFromAlternates.length > 0) files = files.concat(filesFromAlternates)

  if (files.length === 0) {
    files.push(fallbackPostFile('Requires Login'))
    requiresLogin = true
  }

  files = files
    .filter((file: PostFile | undefined): file is PostFile => file !== undefined)
    .sort((a: PostFile, b: PostFile) => b.megapixels - a.megapixels)

  const tags: Tags = mapToTags(postObject.tags)

  const isVideo = files.some((file: PostFile) => file.ext && ['webm', 'mp4'].includes(file.ext))
  const isGif =
    tags.meta.includes('animated_png') ||
    files.some((file: PostFile) => file.ext && ['gif', 'apng'].includes(file.ext))
  const hasSound = tags.meta.includes('sound') || tags.artist.includes('sound_warning')

  const rating = { s: 'safe', q: 'questionable', e: 'explicit' }[postObject.rating as string]
  if (!rating) throw new Error(`Invalid rating: ${postObject.rating}`)

  return {
    id: postObject.id,
    description: postObject.description,
    tags: tags,
    sources: postObject.sources,
    rating: rating as 'safe' | 'questionable' | 'explicit',
    pools: postObject.pools,
    files,
    isVideo,
    isGif,
    hasSound,
    requiresLogin,
    previewImage (): PostFile {
      return this.files.filter((file: PostFile) => {
        return !['webm', 'mp4', 'gif', 'apng'].includes(file.ext || '')
      })[0]
    },
    highestResFile (): PostFile {
      return files.sort((a: PostFile, b: PostFile) => b.megapixels - a.megapixels)[0]
    }
  }
}
