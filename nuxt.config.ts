import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({

  app: {
    head: {
      title: 'ZapShoes',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Tienda de zapaatillas' },

        // Open Graph Meta Tags
        { property: 'og:title', content: 'ZapShoes' },
        { property: 'og:description', content: 'Tienda de zapaatillas' },
        { property: 'og:url', content: 'https://zap-shoes.vercel.app/' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://fastmedicaltest.blob.core.windows.net/logo/logo_zapshoes.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:site_name', content: 'ZapShoes' },
        { property: 'og:locale', content: 'es_ES' }
      ],

      link: [
        { rel: 'icon', type: 'image/png', href: '/zapshoe.png' },
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
