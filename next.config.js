// module.exports = {
//   reactStrictMode: true,
// }

const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

module.exports = withImages(
  withCSS(withSass({
    cssModules: false,
    webpack5: false
  }))
)