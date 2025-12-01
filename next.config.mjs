import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

export default withNextra({
  images: {
    unoptimized: true,
  },
  output: "export",
  webpack(config) {
    if (process.env.CF_PAGES === '1') {
      config.cache = false
    }
    return config
  },
})
