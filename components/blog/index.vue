<script setup lang="ts">

const router = useRouter()

const props = defineProps<{
    title: string
    description: string
    author: string
    date: string
    readingTime?: number,
    path: string,
}>()

const handleClick = () => {
    router.push(props.path)
}
</script>

<template>
    <UCard class="max-w-md mx-auto transition-shadow hover:shadow-lg border border-gray-200 dark:border-gray-700">
        <template #header>
            <h2 class="text-xl font-semibold text-primary hover:underline line-clamp-2 cursor-pointer"
            @click="handleClick">
                {{ title }}
            </h2>
        </template>

        <p class="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
            {{ description }}
        </p>

        <template #footer>
            <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center flex-wrap gap-2">
                <span>{{ author }}</span>
                <span>•</span>
                <span>{{ date }}</span>
                <span v-if="readingTime">•</span>
                <span v-if="readingTime">{{ readingTime }} min read</span>
            </div>
        </template>
    </UCard>
</template>