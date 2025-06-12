<script setup lang="ts">
const { data: posts } = await useAsyncData('blog', () => {
  return queryCollection('blog').all()
})
</script>

<template>
  <div>
    <h1>Blog 1</h1>
    <ul>
      
    </ul>
  </div>
</template>
