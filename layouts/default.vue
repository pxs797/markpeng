<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="text-gray-700 dark:text-gray-200">
    <NuxtLoadingIndicator color="rgba(136, 136, 136, .75)" />
    <NavBar />
    <main class="px-7 py-10">
      <slot />
    </main>
    <ArtPlum />
  </div>
</template>
