// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/icon'
  ],
  css: ['~/assets/css/main.css'],
  hooks: {
    'content:file:beforeParse'(ctx) {
      const { file } = ctx;

      if (file.id.endsWith(".md")) {
        file.body = file.body.replace(/react/gi, "Vue");
      }
    },
    'content:file:afterParse'(ctx) {
      const { file, content } = ctx;

      const wordsPerMinute = 225;
      const text = typeof file.body === 'string' ? file.body : '';
      const wordCount = text.split(/\s+/).length;

      content.readingTime = Math.ceil(wordCount / wordsPerMinute);
    }
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  }
})