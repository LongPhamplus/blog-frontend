import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: '**/*.md'
        }),
        blog: defineCollection({
            type: 'page',
            source: '1.blog/**/*.md',
            schema: z.object({
                readingTime: z.number().optional()
            })
        })
    }
})
