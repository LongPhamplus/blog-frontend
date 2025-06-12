<script setup lang="ts">
const { data: blogs } = await useAsyncData(() => {
    return queryCollection('blog')
        .all()
})
watchEffect(() => {
    console.log(blogs.value);
});

</script>

<template>
    <div>
        <h1>Blog</h1>
        <ul>
            <li v-for="blog in blogs" :key="blog.id">
                <NuxtLink :to="blog.path">{{ blog.title }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>
