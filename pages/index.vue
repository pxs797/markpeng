<script setup lang="ts">
const { data } = await useAsyncData(() => queryCollection('content').path('/').first())
</script>

<template>
  <div class="prose prose-base dark:prose-invert m-auto">
    <ContentRenderer
      v-if="data"
      :value="data"
    />
  </div>
</template>
