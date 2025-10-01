// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  app : {
    head: {
      title: "WordMind | World of word guess",
    },
  },
  ssr : true,
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@nuxt/image'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  nitro: {
    experimental: {
      websocket: true
    }
  }
})