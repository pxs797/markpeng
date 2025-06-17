<script setup lang="ts">
import { formatDate } from '@/utils'

const { data } = await useAsyncData(() => queryCollection('blog').all())
const posts = computed(() =>
  (data.value ?? []).slice().sort((a, b) =>
    new Date(b.meta.date as string).getTime() - new Date(a.meta.date as string).getTime()),
)
</script>

<template>
  <div class="list prose prose-base dark:prose-invert m-auto space-y-8">
    <NuxtLink
      v-for="item in posts"
      :key="item.path"
      class="block no-underline"
      :to="item.path"
    >
      <div class="flex flex-col gap-2">
        <div class="text-2xl font-bold">{{ item.title }}</div>
        <div class="opacity-50">
          <span
            v-if="item.meta.date"
            class="whitespace-nowrap"
          >{{ formatDate(item.meta.date as string) }}</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
