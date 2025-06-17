<script setup lang="ts">
function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const { y: scroll } = useWindowScroll()
</script>

<template>
  <header class="nav flex items-center justify-between p-4">
    <NuxtLink
      to="/"
    >
      <span class="font-bold">markpeng</span>
    </NuxtLink>
    <nav class="grid grid-flow-col gap-4 items-center">
      <NuxtLink to="/blog">Blog</NuxtLink>
      <NuxtLink
        class="h-[1em] leading-[1em]"
        to="https://github.com/pxs797"
        target="_blank"
      >
        <Icon
          name="carbon:logo-github"
        />
      </NuxtLink>
      <ToggleTheme />
      <button
        :class="[
          'fixed right-3 bottom-3 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-400/30 hover:opacity-100 transition duration-300 z-100 print:hidden',
          scroll > 240 ? 'opacity-50 ' : 'opacity-0 pointer-events-none',
        ]"
        @click="toTop"
      >
        <Icon name="carbon:arrow-up" />
      </button>
    </nav>
  </header>
</template>
