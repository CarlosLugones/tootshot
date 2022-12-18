const description = 'A beautiful way to share your toots'
const banner = 'https://tootshot.xyz/cover.jpg'
const title = 'TootShot — A beautiful way to share your toots'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: title,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'og:locale', content: 'en_EN' },
      { name: 'og:locale', property: 'og:locale', content: 'en_EN' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: title
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: title
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: title
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: title
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: description
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: banner
      },
      {
        name: 'image',
        property: 'og:image',
        content: banner
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: 'TootShot'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: title
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: banner
      },
      {
        name: 'author',
        content: 'TootShot'
      },
      {
        name: 'description',
        property: 'og:description',
        content: description
      },
      {
        name: 'og:url',
        property: 'og:url',
        content: 'https://tootshot.xyz'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
      'primeflex/primeflex.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/toast.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',

    // https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://www.primefaces.org/primevue/showcase-v2/#/setup
    'primevue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    'nuxt-rfg-icon'
  ],

  'rfg-icon': {
    static: true,
    staticPath: 'static',
    masterPicture: 'static/favicon.png',
    rfg: {
      masterPicture: 'static/favicon.png',
      iconsPath: '/',
      design: {
        ios: {
          pictureAspect: 'noChange',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          }
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#2a8cd3',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false
            }
          }
        },
        androidChrome: {
          pictureAspect: 'shadow',
          themeColor: '#2a8cd3',
          manifest: {
            name: 'TootShot',
            startUrl: 'https://tootshot.xyz',
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true
          },
          assets: {
            legacyIcon: true,
            lowResolutionIcons: false
          }
        },
        safariPinnedTab: {
          pictureAspect: 'blackAndWhite',
          threshold: 66.40625,
          themeColor: '#2a8cd3'
        }
      },
      settings: {
        compression: 3,
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: true,
        htmlCodeFile: true,
        usePathAsIs: false
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    proxyHeaders: false,
    credentials: false,
    headers: {
      common: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  },

  // Moment
  moment: {
    defaultLocale: 'en-ca',
    locales: ['es', 'en-ca'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://github.com/primefaces/primevue/issues/844
    transpile: ['primevue'],
  }
}
