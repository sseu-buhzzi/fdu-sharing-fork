import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

export default withNextra({
  images: {
    unoptimized: true,
  },
  webpack(config) {
    console.log(`CF_PAGES=${process.env.CF_PAGES}`)
    if (process.env.CF_PAGES === '1') {
      config.cache = false
    }
    return config
  },
})
