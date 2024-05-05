<script setup lang="ts">
import {computed, defineEmits, defineProps, type Ref, ref, watch} from "vue";

const props = defineProps(['modelValue', 'orderTypes', 'hideOrderDirection', 'loading'])
const emit = defineEmits(["update:modelValue", "update:loading", "filterChange", "searchEnter", "searchChange"])

const searchQueryText = computed({
  get() {
    return props.modelValue
  },
  set(newState: string) {
    emit('update:modelValue', newState)
  }
})

const internallyLoading = ref(false)

const isLoading = computed({
  get() {
    return (internallyLoading.value || props.loading)
  },
  set() {
    // TODO: Implement
  }
})

const currentOrderType = ref(props.orderTypes[0])
const orderDirection: Ref<'desc' | 'asc'> = ref('desc')

const showOrderDirection = computed(() => {
  return !props.hideOrderDirection
})

watch([currentOrderType, orderDirection], () => {
  emit('filterChange', {
    searchQuery: searchQueryText.value,
    orderBy: currentOrderType.value,
    orderDirection: orderDirection.value
  })
})

function searchEnter (keyboardEvent: KeyboardEvent) {
  emit('searchEnter', {
    searchQuery: searchQueryText.value,
    orderBy: currentOrderType.value,
    orderDirection: orderDirection.value,
    event: keyboardEvent
  })
}
function searchChange (inputEvent: InputEvent | Event) {
  emit('searchChange', {
    searchQuery: searchQueryText.value,
    event: inputEvent
  })
}
</script>

<template>
<div class="square searchBar">

  <div class="dropdownFilters" :class="{ showOrderDirection: showOrderDirection }">
    <select class="searchBarOrderTarget" v-model="currentOrderType">
      <option v-for="target in props.orderTypes" :key="target" :value="target" :name="target">
        {{ $t(`orderBy.${target}`) }}
      </option>
    </select>
    <select class="searchBarOrderState" v-if="showOrderDirection" v-model="orderDirection">
      <option value="asc">Asc</option>
      <option value="desc">Desc</option>
    </select>
  </div>

  <div class="searchBarInput">
    <input
      ref="searchBar"
      type="text"
      :disabled="isLoading"
      :data-loading="isLoading"
      placeholder="Search..."
      v-model="searchQueryText"
      @keydown.enter="searchEnter"
      @input="searchChange"
    />
  </div>
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
}

@keyframes blink {
  from {opacity: 0.25}
  to {opacity: 1}
}
</style>
