<script setup lang="ts">
interface Props {
    body: {
        type: string
        value: any[]
        toc?: any
    }
}
const props = defineProps<Props>()
const tagClasses: Record<string, string> = {
    h1: 'text-3xl font-bold mb-4 mt-8 text-gray-900 dark:text-white',
    h2: 'text-2xl font-semibold mb-3 mt-6 text-gray-800 dark:text-white',
    h3: 'text-xl font-medium mb-2 mt-5 text-gray-700 dark:text-white',
    p: 'mb-4 text-gray-700 dark:text-gray-300',
}

</script>

<template>
    <div class="prose dark:prose-invert max-w-none">
        <component v-for="(node, index) in body.value" :key="index" :is="node[0]"
            :class="tagClasses[node[0]] ?? 'mb-4'">
            {{ node[2] }}
        </component>
    </div>
</template>