// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["nuxt-mongoose", "@pinia/nuxt", "@nuxt/ui", "@nuxtjs/i18n"],
  mongoose: {
    modelsDir: "~/server/models",
    devtools: true,
  },
  nitro: {
    plugins: ["~/server/plugins/mongodb.ts"],
  },
  i18n: {
    vueI18n: "~/translate/locales.ts",
  },
});
