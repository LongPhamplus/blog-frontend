<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const items = ref<NavigationMenuItem[][]>([
    [
        {
            label: 'Guide',
            icon: 'i-lucide-book-open',
            children: [
                {
                    label: 'Introduction',
                    description: 'Fully styled and customizable components for Nuxt.',
                    icon: 'i-lucide-house'
                },
                {
                    label: 'Installation',
                    description: 'Learn how to install and configure Nuxt UI in your application.',
                    icon: 'i-lucide-cloud-download'
                },
                {
                    label: 'Icons',
                    icon: 'i-lucide-smile',
                    description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
                },
                {
                    label: 'Colors',
                    icon: 'i-lucide-swatch-book',
                    description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
                },
                {
                    label: 'Theme',
                    icon: 'i-lucide-cog',
                    description:
                        'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
                }
            ]
        },
    ],
    [
        {
            label: 'GitHub',
            icon: 'i-simple-icons-github',
            badge: '3.8k',
            to: 'https://github.com/nuxt/ui',
            target: '_blank'
        },
        {
            label: 'Help',
            icon: 'i-lucide-circle-help',
            disabled: true
        }
    ]
])

</script>

<template>
    <UApp>
        <UNavigationMenu highlight highlight-color="primary" orientation="horizontal" :items="items"
            class="data-[orientation=horizontal]:border-b border-default data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48" />
    </UApp>
</template>