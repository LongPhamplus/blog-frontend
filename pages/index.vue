<script setup lang="ts">
const { data: blogs } = await useAsyncData('blogs', () => {
  return queryCollection('blog')
    .all()
})

function formatDate(dateStr: string): string {
  if (!dateStr) return 'There are no date';

  const date = new Date(dateStr.trim());

  if (isNaN(date.getTime())) return 'Invalid Date !!';

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

</script>

<template>
  <div class="blog-list-container">
    <header class="mb-12 text-center">
      <h1 class="text-4xl font-bold mb-4">Blog của tôi</h1>
      <p class="text-xl text-gray-600">
        Chia sẻ kiến thức về web development và cuộc sống
      </p>
    </header>

    <div class="blog-grid">
      <article v-for="blog in blogs" :key="blog.path" class="blog-card">
        <Blog :title="blog.title" :description="blog.description" :author="String(blog.meta?.author ?? '')"
          :date="formatDate(String(blog.meta?.date ?? ''))" :reading-time="blog.readingTime" :path="blog.path" />
        <!-- Access frontmatter fields like date, author, and tags via `meta` because Nuxt content 
                     group all frontmater inside the `meta` property by default -->
      </article>
    </div>

    <!-- Empty state -->
    <div v-if="!blogs || blogs.length === 0" class="text-center py-12">
      <p class="text-xl text-gray-500">Chưa có bài viết nào được xuất bản.</p>
    </div>
  </div>
</template>


<style scoped lang="scss">
.blog-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.blog-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
}

.blog-image {
  position: relative;
  overflow: hidden;
}

.blog-image img {
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-content {
  padding: 1.5rem;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.blog-title {
  margin-bottom: 0.75rem;
}

.blog-title a {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  text-decoration: none;
  transition: color 0.3s ease;
}

.blog-title a:hover {
  color: #3b82f6;
}

.blog-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #eff6ff;
  color: #2563eb;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.blog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.read-more-btn {
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.read-more-btn:hover {
  color: #1d4ed8;
}

.author {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Responsive */
@media (max-width: 768px) {
  .blog-list-container {
    padding: 1rem;
  }

  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>