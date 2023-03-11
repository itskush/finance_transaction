// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss','@nuxtjs/apollo'],
    css: [
    '@/assets/css/styles.css',
    ],
    apollo: {
        clients: {
          default: {
            httpEndpoint: 'http://localhost:4000/graphql'
          }
        },
    },
})
