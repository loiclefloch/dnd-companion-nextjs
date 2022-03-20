const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  images: {
    domains: [
      'media-waterdeep.cursecdn.com',
      'aidedd.org',
      'www.aidedd.org',
    ]
  }
})
