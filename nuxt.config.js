export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: "static",

  head: {
    title: "中恒EMI云数据平台", //"nuxt-big-screen",
    htmlAttrs: {
      lang: "zh-CN",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "~assets/css/public.css",
    "~assets/css/font.css",
  ],

  server: {
    port: 7777,
    host: "0.0.0.0",
  },

  router: {
    alias: {
      '/videos/': '~/static/videos/'
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/element-ui",
    "@/plugins/settings",
    { src: "@/plugins/data-v", ssr: false },
    { src: "@/plugins/echarts", ssr: false },
    { src: "@/plugins/directives", ssr: false },
    { src: "@/plugins/auto-screen", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    'nuxt-precompress',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // gzip压缩
  nuxtPrecompress: {
    gzip: {
      enabled: true,
      filename: "[path].gz[query]",
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      enabled: true,
      filename: "[path].br[query]",
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
    enabled: true,
    report: false,
    test: /\.(js|css|html|txt|xml|svg)$/,
    // Serving options
    middleware: {
      enabled: true,
      enabledStatic: true,
      encodingsPriority: ["br", "gzip"],
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
};
