<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <NuxtLayout>
    <div class="prose prose-base dark:prose-invert m-auto">
      <h2>{{ error?.statusCode }}</h2>
      <div>{{ error?.statusMessage }}</div>
    </div>
  </NuxtLayout>
</template>
