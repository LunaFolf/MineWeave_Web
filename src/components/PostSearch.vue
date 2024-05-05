<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'
import { findClosestMatches } from '@/utils/tags'
import {ref} from 'vue'
import {useElementVisibility} from "@vueuse/core";
import ToggleBtn from "@/components/ToggleBtn.vue";

const postsStore = usePostsStore()
const activeSearch = ref(postsStore.searchStringFiltered)

const postSearchBar = ref(null)
const searchTags = ref([])

const postSearchBarIsVisible = useElementVisibility(postSearchBar)

function submitChange({ target }) {
  if (target) postsStore.setSearchArray(target.value.split(' '))
  postsStore.clear()
  postsStore.search()

  searchTags.value = []
}

const showPools = ref(null)
showPools.value = postsStore.filters['inpool']

let caretPos = 0

let foundWord = {
  start: 0,
  word: ''
}

async function findTags(event) {
  const target = event.target as HTMLInputElement
  caretPos = target.selectionStart || 0

  let closestWord = ''
  // Find the closest word to the caret
  for (let i = caretPos - 1; i >= 0; i--) {
    if (target.value[i] === ' ') {
      break
    }
    closestWord = target.value[i] + closestWord
  }

  foundWord.start = caretPos - closestWord.length
  foundWord.word = closestWord

  searchTags.value = await findClosestMatches(closestWord)
}

function selectTag(tag) {
  let search = `${activeSearch.value}`
  let modifier = ''

  if (tag.hasExclusionChar) modifier = '-'
  if (tag.hasConditionalChar) modifier = '~'

  activeSearch.value =
    search.slice(0, foundWord.start) +
    (modifier + tag.name) + ' ' +
    search.slice(foundWord.start + foundWord.word.length)

  postsStore.setSearchArray(activeSearch.value.split(' '))

  searchTags.value = []

  postSearchBar.value.focus()
}

function scrollToSearch() {
  postSearchBar.value.focus()
}

function toggleFilter(filterName: string, state: Boolean) {
  postsStore.filters[filterName] = state

  postsStore.clear()
  postsStore.search()
}
</script>

<template>
  <div class="square searchBar">

    <div class="dropdownFilters" :class="{ showOrderDirection: postsStore.showOrderDirection }">
      <select class="searchBarOrderTarget" v-model="postsStore.orderTarget">
        <option v-for="target in postsStore.orderTargets" :key="target" :value="target" :name="target">
          {{ target[0].toUpperCase() + target.slice(1) }}
        </option>
        <option value="none">Most Recent</option>
      </select>
      <select class="searchBarOrderState" v-if="postsStore.showOrderDirection" v-model="postsStore.orderState">
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>

    <div class="searchBarInput">
      <input
        ref="postSearchBar"
        type="text"
        :disabled="postsStore.loading"
        :data-loading="postsStore.loading"
        placeholder="Search..."
        v-model="activeSearch"
        @keydown.enter="submitChange"
        @input="findTags"
      />
      <div class="suggestedTags" :style="{ height: `${searchTags.length * 50}px` }">
        <div
          v-for="tag in searchTags"
          :key="tag.name + tag.matchedAlias"
          class="tag"
          :class="`${tag.category}Tags`"
          @click="selectTag(tag)"
        >
          <div class="name" v-html="tag.formattedHTML"></div>
          <div class="count">{{ Number(tag.count).toLocaleString() }}</div>
        </div>
      </div>
    </div>

    <div class="toggleFilters">
      <ToggleBtn v-model="showPools" @update:model-value="state => toggleFilter('inpool', state)">
        Show In Pools
      </ToggleBtn>
    </div>
  </div>

  <div v-if="!postSearchBarIsVisible" class="fab fab-bottom-left" @click="scrollToSearch">
    <font-awesome-icon icon="up-to-line" />
  </div>
</template>

<style scoped>
.searchBar {
  grid-column: 1/-1;

  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'dropdownFilters searchInputField toggleFilters';
  gap: .5rem;

  padding: .25rem .5rem;

  background-color: var(--color-background-soft)
}

.dropdownFilters {
  grid-area: dropdownFilters
}

.toggleFilters {
  display: grid;
  grid-area: toggleFilters;
  gap: 0.5rem;
}

.searchBarInput {
  grid-area: searchInputField;
  position: relative;
}
.searchBarInput input {
  width: 100%;
}

.searchBarOrderTarget {
  grid-area: orderTarget;
}

.searchBarOrderState {
  grid-area: orderState;
}


.dropdownFilters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'orderTarget orderTarget';
  gap: .5rem;
}

.showOrderDirection {
  grid-template-areas: 'orderTarget orderState';
}

@media only screen and (max-width: 520px) {
  .searchBar {
    grid-template-columns: 1fr;
    grid-template-areas:
      'searchInputField'
      'dropdownFilters'
      'toggleFilters';
  }

  .toggleFilters {
    grid-template-columns: 1fr 1fr;
  }
}

.suggestedTags {
  height: 0;
  overflow: hidden;
  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;

  top: 2.5rem;
  width: 100%;
  position: absolute;
  background-color: var(--vt-c-dark);

  transition: height .125s;

  z-index: 999;

  /*padding: .75rem 1rem;*/
}

.tag {
  padding: 0.75rem 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  border-bottom: 1px solid var(--vt-c-dark-soft);
  border-top: 1px solid var(--vt-c-dark-soft);
}

.tag:hover {
  background-color: var(--vt-c-dark-mute);
  cursor: pointer;
}

@keyframes blink {
  from {opacity: 0.25}
  to {opacity: 1}
}
.tag .name .match {
  animation: blink 1s infinite alternate ease-out;
}
</style>
