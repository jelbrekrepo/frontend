const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  poweredByHeader: false,
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL
  }
})
