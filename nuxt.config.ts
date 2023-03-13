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
    app: {
      head: {
        charset: 'utf-16',
        viewport: 'width=500, initial-scale=1',
        title: 'Finance Transactions',
        meta: [
          { name: 'description', content: 'A dashboard page same for transactions uploaded via csv.' }
        ],
      }
    }
})
