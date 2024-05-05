<script setup lang="ts">
import {defineProps, watch} from 'vue'
import { vElementVisibility } from '@vueuse/components'
import { ref } from 'vue'
import router from '@/router'

const props = defineProps({
  post: Object,
  isLastItem: Boolean,
  full: Boolean,
})

const emit = defineEmits(['nextPage'])

const isVisible = ref(false)

if (props.isLastItem) {
  watch(isVisible, isVisible => {
    if (isVisible) emit('nextPage')
  })
}

function onElementVisibility(state: boolean) {
  if (props.isLastItem) isVisible.value = state
}

const files = props.post.files.filter((file: PostFile) => !['webm', 'mp4'].includes(file.ext || ''))
const previewFiles = files.filter(
  (file: PostFile) => file.megapixels <= 4 && !['gif', 'apng'].includes(file.ext || '')
)
const highestResFile = files.sort((a: PostFile, b: PostFile) => b.megapixels - a.megapixels)[0]

</script>

<template>
  <div
    class="post"
    style="cursor: pointer"
    :class="[post.rating, full ? 'full' : '']"
    v-element-visibility="onElementVisibility"
  >
    <img :src="full ? highestResFile.url : previewFiles[0].url" alt="" />
    <div v-if="!full" class="icons">
      <font-awesome-layers class="fa-lg" v-if="post.isGif">
        <font-awesome-icon style="color: var(--vt-c-text-light-2)" icon="square" />
        <font-awesome-icon :icon="['fal', 'gif']" transform="shrink-6 left-1" />
      </font-awesome-layers>

      <font-awesome-layers class="fa-lg" v-if="post.isVideo">
        <font-awesome-icon style="color: var(--vt-c-text-light-2)" icon="square" />
        <font-awesome-icon :icon="['fal', 'film']" transform="shrink-6" />
      </font-awesome-layers>

      <font-awesome-layers class="fa-lg" v-if="post.hasSound">
        <font-awesome-icon style="color: var(--vt-c-text-light-2)" icon="square" />
        <font-awesome-icon :icon="['fal', 'speakers']" transform="shrink-7 left-2" />
      </font-awesome-layers>

      <font-awesome-layers class="fa-lg" v-if="post.pools.length">
        <font-awesome-icon style="color: var(--vt-c-text-light-2)" icon="square" />
        <font-awesome-icon :icon="['fal', 'grid-horizontal']" transform="shrink-7" />
      </font-awesome-layers>
    </div>
    <div class="artists">
      {{
        post.tags.artist
          .filter((t) => !['conditional_dnp', 'sound_warning', 'dnp'].includes(t))
          .join(',')
      }}
    </div>
  </div>
</template>

<style scoped>
.post {
  aspect-ratio: 1/1;
  position: relative;

  overflow: hidden;
}

.post.full {
  aspect-ratio: unset;
}

.post .artists {
  font-size: 1rem;
  line-height: 1.5rem;

  font-weight: 900;

  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;

  color: var(--vt-c-text-dark-1);

  filter: drop-shadow(0.25rem 0.25rem 0.125rem var(--vt-c-dark));
}

.post .icons {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;

  grid-auto-flow: column;

  display: grid;
  gap: 0.125rem;
}

.post img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post.safe,
.post.questionable,
.post.explicit {
  border-bottom-style: inset;
  border-bottom-width: 0.25rem;
}

.post.safe {
  border-color: seagreen;
}
.post.questionable {
  border-color: darkorange;
}
.post.explicit {
  border-color: mediumvioletred;
}
</style>
