import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/webp', href: 'https://zapshoes.netlify.app/logoweb.webp' },
        // You can add more link tags here if needed
      ],
    },
  },

  css: [
    '@/assets/styles/globals.css',
    // Puedes agregar más archivos CSS aquí
  ],

  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
