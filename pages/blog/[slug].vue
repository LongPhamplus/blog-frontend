<script setup lang="ts">
const { slug } = useRoute().params
const { data: post } = await useAsyncData(`${slug}`, () => {
  return queryCollection('blog')
    .where('path', '=', `/blog/${slug}`)
    .first()
})

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog not found',
  })
}
useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
  ogTitle: post.value?.title,
  ogDescription: post.value?.description,
})

</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-10">
    <article v-if="post">
      <!-- Header -->
      <header class="mb-10 border-b pb-6 border-gray-200 dark:border-gray-700">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ post.title }}
        </h1>

        <!-- Meta -->

        <div class="flex flex-wrap items-center justify-between gap-6 text-sm text-gray-600 dark:text-gray-400">
          <!-- Date -->
          <div class="flex items-center space-x-2" v-if="post.meta?.date">
            <Icon name="lucide:calendar-days" class="h-4 w-4 text-brand-500" />
            <time :datetime="String(post.meta.date)" class="font-medium">
              {{ new Date(String(post.meta.date)).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }) }}
            </time>
          </div>

          <!-- Author -->
          <div class="flex items-center space-x-2" v-if="post.meta?.author">
            <Icon name="lucide:pen" class="h-4 w-4 text-brand-500" />
            <span class="font-medium">{{ post.meta.author }}</span>
          </div>

          <!-- Reading time -->
          <div class="flex items-center space-x-2" v-if="post.readingTime">
            <Icon name="lucide:clock" class="h-4 w-4 text-brand-500" />
            <span class="font-medium">{{ post.readingTime }} phút đọc</span>
          </div>
        </div>


        <!-- Tags -->
        <div v-if="post.meta?.tags" class="flex flex-wrap gap-2 mt-4">
          <span v-for="tag in post.meta.tags" :key="tag"
            class="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-full text-xs font-medium">
            {{ tag }}
          </span>
        </div>
      </header>

      <!-- Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <BlogContentRender :body="post.body" />
      </div>

      <!-- Footer -->
      <footer class="mt-16 border-t pt-6 border-gray-200 dark:border-gray-700 text-center">
        <NuxtLink to="/" class="text-blue-600 hover:underline dark:text-blue-400">
          ← Quay lại danh sách blog
        </NuxtLink>
      </footer>
    </article>
  </div>
</template>
