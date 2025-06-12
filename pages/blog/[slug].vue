<script setup lang="ts">
const { slug } = useRoute().params
const { data: post } = await useAsyncData(`${slug}`, () => {
  return queryCollection('blog')
    .where('path', '=', `/blog/${slug}`)
    .first()
})

console.log('path: ', post.value?.path)
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
  <div class="blog-post-container">
    <article v-if="post">
      <!-- Header -->
      <header class="blog-header">
        <h1 class="blog-title">{{ post.title }}</h1>

        <!-- Meta information -->
        <div class="blog-meta">
          <time v-if="post.meta?.date" :datetime="post.meta.date">
            {{ new Date(post.meta.date).toLocaleDateString('vi-VN') }}
          </time>
          <span v-if="post.meta?.author">bởi {{ post.meta.author }}</span>
          <span v-if="post.meta?.readingTime">{{ post.meta.readingTime }} phút đọc</span>
        </div>

        <!-- Tags -->
        <div v-if="post.meta?.tags" class="blog-tags">
          <span v-for="tag in post.meta.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </header>

      <!-- Content -->
      <div class="blog-content">
        <ContentRenderer :value="post" />
      </div>

      <!-- Navigation -->
      <footer class="blog-footer">
        <NuxtLink to="/blog" class="back-link">
          ← Quay lại danh sách blog
        </NuxtLink>
      </footer>
    </article>
  </div>
</template>

<style scoped lang="scss">
.blog-post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
}

.blog-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.blog-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #f0f0f0;
  color: #333;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
}

.blog-content {
  line-height: 1.7;
  font-size: 1.1rem;
}

.blog-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e5e5;
}

.back-link {
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .blog-post-container {
    padding: 1rem;
  }

  .blog-title {
    font-size: 2rem;
  }

  .blog-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
