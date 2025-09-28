// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr : true,
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@nuxt/image'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})