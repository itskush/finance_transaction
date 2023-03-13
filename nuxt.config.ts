// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/apollo'],
    css: [
    '@/assets/css/styles.css',
    'vue-toast-notification/dist/theme-default.css'
    ],
    apollo: {
      clients: {
        default: {
          httpEndpoint: 'http://localhost:4000/graphql',
          inMemoryCacheOptions: {},
        }
      },
    },
    // build: {
    //   transpile: [
    //     '@apollo/client',
    //     'ts-invariant/process',
    //   ],
    // },
    // runtimeConfig: {
    //   apiSecret: process.env.API_ENDPOINT,
    // }
})
