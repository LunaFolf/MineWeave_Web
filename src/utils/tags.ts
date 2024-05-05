interface TagJson {
  name: string
  count: number
  category: 'general' | 'artist' | 'copyright' | 'character' | 'species' | 'meta',
  matchedAlias?: string
}

interface FormattedTag extends TagJson {
  formattedHTML: string,
  hasExclusionChar: boolean,
  hasConditionalChar: boolean
}

interface TagAlias {
  antecedent: string,
  consequent: string
}

let tags: TagJson[] = [];

let tagAliases: TagAlias[] = [];

const loadTags = async (): Promise<TagJson[]> => {
  if (!tags.length) {
    const response = await fetch('/tags.json');
    tags = await response.json();
  }
  return tags;
}
const loadAliases = async (): Promise<TagAlias[]> => {
  if (!tagAliases.length) {
    const response = await fetch('/tag_aliases.json');
    tagAliases = await response.json();
  }
  return tagAliases;
}

loadTags()
loadAliases()

const minimumSearchLength = 3

// Find tags that start with or contain the given string, prioritizing tags that start with the string
export const findClosestMatches = async (search: string, maxResults = 20): Promise<string[]> => {
  const tags = await loadTags(); // Load the tags data
  const aliases = await loadAliases();

  // trim any non-alphanumeric characters from the start of the search string
  const trimmedSearch = search.replace(/^[\W_]+/, '');
  if (trimmedSearch.length === 0) return [];

  // lowercase the search string, makes finding it easier
  const searchLower = trimmedSearch.toLowerCase();

  const hasExclusionChar = search.startsWith('-');
  const hasConditionalChar = search.startsWith('~');

  if (searchLower.length < minimumSearchLength) return []; // Return if search length is length than minimum (usually 3)

  // Begin the actual search

  const startsWith = tags
    .filter(tag => {
      // find tags that start with the search string
      return tag.name.toLowerCase().startsWith(searchLower)
    })
    .slice(0, Math.ceil(maxResults * 0.8))
    .sort((tagA, tagB) => tagB.count - tagA.count)

  const foundAliases: TagJson[] = aliases
    .filter(alias => {
      return alias.antecedent.startsWith(searchLower)
    })
    .map(alias => {
      const matchedTag = tags.find(tag => tag.name === alias.consequent)

      const tag: TagJson = { ...matchedTag, matchedAlias: alias.antecedent }

      return tag
    })
    .filter(tag => tag.name)
    .slice(0, Math.ceil(maxResults * 0.2))
    .sort((tagA, tagB) => tagB.count - tagA.count)

  const contains = tags
    .filter(tag => {
      // find tags that contain the search string
      return tag.name.toLowerCase().includes(searchLower) && !startsWith.includes(tag)
    })
    .slice(0, Math.ceil(maxResults * 0.8))
    .sort((tagA, tagB) => tagB.count - tagA.count)

  return [...foundAliases, ...startsWith, ...contains]
    .map(tag => {
      const formattedHTML = getFormattedHTML(tag, searchLower)

      const output: FormattedTag = {
        ...tag,
        formattedHTML,
        hasExclusionChar,
        hasConditionalChar
      }

      return output;
    });
};

function getFormattedHTML(tag: TagJson, searchInput: string): string {
  let tagName = tag.name
  if (tag.matchedAlias) tagName = tag.matchedAlias

  const matchStart = tagName.indexOf(searchInput)
  const matchEnd = matchStart + searchInput.length

  const matchedHTML = tagName.slice(0, matchStart) + `<span class="match">${searchInput}</span>` + tagName.slice(matchEnd)

  return tag.matchedAlias ? `<span class="text-ghost">${matchedHTML}</span> → ${tag.name}` : matchedHTML
}
