<script setup lang="ts">
import { formatDate } from '@/utils'

const { data } = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div>
    <div
      v-if="data.title"
      class="prose prose-base dark:prose-invert m-auto mb-8"
    >
      <h1>{{ data.title }}</h1>
      <div v-if="data.meta.date">
        {{ formatDate(data.meta.date as string) }}
      </div>
    </div>
    <article class="prose prose-base dark:prose-invert m-auto">
      <ContentRenderer :value="data" />
    </article>
  </div>
</template>
