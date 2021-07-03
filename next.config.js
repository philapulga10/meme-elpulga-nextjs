// module.exports = {
//   reactStrictMode: true,
// }

const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

module.exports = withCSS(withSass({
  cssModules: true,
  webpack5: false
}))